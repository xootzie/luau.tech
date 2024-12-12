const axios = require('axios');

const versionSearchHandler = async (req, res) => {

  let deployHistoryCache = {
    data: null,
    lastFetch: null,
    expirationTime: 5 * 60 * 1000
  };
  
  async function getDeployHistory() {
    try {
  
      const now = Date.now();
      if (
        deployHistoryCache.data &&
        deployHistoryCache.lastFetch &&
        (now - deployHistoryCache.lastFetch) < deployHistoryCache.expirationTime
      ) {
        return deployHistoryCache.data;
      }
  
      const response = await axios.get('http://setup.rbxcdn.com/DeployHistory.txt');
      deployHistoryCache.data = response.data;
      deployHistoryCache.lastFetch = now;
      return response.data;
    } catch (error) {
      console.error('Error fetching deploy history:', error);
      throw new Error('Failed to fetch deploy history');
    }
  }
  
    try {
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({
          error: 'Text is required in the request body'
        });
      }
  
      const deployHistory = getDeployHistory();
  
      const versionRegex = /version-[a-fA-F0-9]{16}/g;
      const fileVersionRegex = /file version: ([\d, ]+)/;
      const gitHashRegex = /git hash: ([^\.]+)/;
  
      const results = deployHistory.split('\n')
        .filter(line => line.toLowerCase().includes(text.toLowerCase()))
        .map(line => {
          const versionMatch = line.match(versionRegex);
          const dateMatch = line.match(/at ([\d/]+ [\d:]+ [AP]M)/);
          const typeMatch = line.match(/^New ([\w]+)/);
          //  const fileVersionMatch = line.match(fileVersionRegex);
          const gitHashMatch = line.match(gitHashRegex);
  
          return {
            version: versionMatch ? versionMatch[0] : null,
            date: dateMatch ? dateMatch[1] : null,
            type: typeMatch ? typeMatch[1] : null,
            //  fileVersion: fileVersionMatch ? fileVersionMatch[1].trim() : null,
            hash: gitHashMatch ? gitHashMatch[1].trim() : null,
            //  fullLine: line
          };
        });
  
      const allVersionMatches = deployHistory.match(versionRegex) || [];
  
      res.json({
        matches: allVersionMatches,
        results: results,
        count: results.length,
        totalVersions: allVersionMatches.length,
        searchTerm: text,
        timestamp: new Date().toISOString()
      });
  
    } catch (error) {
      console.error('Error searching versions:', error);
      res.status(500).json({
        error: 'Internal server error',
        details: error.message
      });
    }

};

module.exports = { versionSearchHandler };