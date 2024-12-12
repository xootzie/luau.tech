const executorSearchHandler = async (req, res) => {
  let retries = 5;
  while (retries > 0) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const searchTerm = q.toLowerCase();
     
      const response = await fetch('https://whatexpsare.online/api/status/exploits', {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WEAO-3PService'
        }
      });
     
      const data = await response.json();
     
      if (Array.isArray(data)) {
        const updatedData = await Promise.all(data.map(async (item) => {
          const { purchaselink, title } = item;
        
          let imagePath = `https://luau.tech/images/executors/${title.toLowerCase().replace(/\s+/g, '-')}.png`;
          
          try {
            const imageResponse = await fetch(imagePath, { method: 'HEAD' });
            if (!imageResponse.ok) {
              imagePath = 'https://luau.tech/images/404.png';
            }
          } catch (error) {
            imagePath = 'https://luau.tech/images/404.png';
          }
          
          if (purchaselink && purchaselink.includes('?ref=')) {
            const originalUrl = purchaselink.split('?ref=')[0];
            return {
              ...item,
              purchaselink: `${originalUrl}?ref=https://luau.tech/`,
              image: imagePath
            };
          } else {
            return {
              ...item,
              image: imagePath
            };
          }
        }));
       
        const matches = updatedData.filter(item => {
          return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.version.toLowerCase().includes(searchTerm) ||
            item.platform.toLowerCase().includes(searchTerm) ||
            item.extype.toLowerCase().includes(searchTerm)
          );
        });
       
        return res.json({
          matches: matches,
          credit: 'https://whatexpsare.online/'
        });
      } else {
        return res.json(data);
      }
    } catch (error) {
      console.error(error);
      retries--;
      if (retries === 0) {
        return res.status(500).json({ error: 'Internal server error, retrying.' });
      }
      console.log(`Retrying... ${retries} attempts left`);
     
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};
module.exports = { executorSearchHandler };