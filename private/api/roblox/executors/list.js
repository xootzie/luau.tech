
const robloxListHandler = async (req, res) => {
    let retries = 5;
    while (retries > 0) {
      try {
        const response = await fetch('https://whatexpsare.online/api/status/exploits', {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'WEAO-3PService'
          }
        });
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const updatedData = data.map(item => {
            const { purchaselink } = item;
            if (purchaselink && purchaselink.includes('?ref=')) {
              const originalUrl = purchaselink.split('?ref=')[0];
              return {
                ...item,
                purchaselink: `${originalUrl}?ref=https://luau.tech/`
              };
            }
            return item;
          });
  
          res.json({
            executors: updatedData,
            credit: 'https://whatexpsare.online/'
          });
        } else {
          res.json(data);
        }
        return;
      } catch (error) {
        console.error(error);
        retries--;
        if (retries === 0) {
          res.status(500).json({ error: 'Internal server error after multiple retries' });
          return;
        }
        console.log(`Retrying... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
};

module.exports = { robloxListHandler };