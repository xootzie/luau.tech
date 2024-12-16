const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function serveErrorPage(res, errorCode, errorMessage) {
  try {
    let content = await fs.readFile(path.join(__dirname, 'private', 'webpage', '404.html'), 'utf8');
   
    content = content.replace(
      /<meta name="x-error-code" content="">/,
      `<meta name="x-error-code" content="${errorCode}">`
    );
    content = content.replace(
      /<meta name="x-error-message" content="">/,
      `<meta name="x-error-message" content="${errorMessage}">`
    );
   
    res.set({
      'Content-Type': 'text/html',
      'X-Error-Code': errorCode,
      'X-Error-Message': errorMessage
    });
   
    return res.send(content);
  } catch (error) {
    console.error('Error serving error page:', error);
    res.status(500).send('Internal Server Error');
  }
}


const setupRoutes = async () => {
  const executorListRoute = require('./private/api/roblox/executors/list.js');
  const executorSearchRoute = require('./private/api/roblox/executors/search.js');
  const asciiRoute = require('./private/api/manipulation/ascii.js');
  const versionSearchRoute = require('./private/api/roblox/version/search.js');
  const arrayValidateRoute = require('./private/api/text/arrayValidate.js');
  const taxCalculatorRoute = require('./private/api/roblox/utility/robuxTaxCalc.js');
  
  app.get('/build', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, 'private', 'api', 'development', 'loader'));
  });


  app.post('/api/array/validate', arrayValidateRoute.arrayValidateHandler);
  app.get('/api/text/asciify', asciiRoute.asciiHandler);
  app.get('/api/roblox/tax-calculate', taxCalculatorRoute.taxCalculator);
  app.get('/api/roblox/executors/list', executorListRoute.robloxListHandler);
  app.get('/api/roblox/executors/search', executorSearchRoute.executorSearchHandler);
  app.get('/api/roblox/version/search', versionSearchRoute.versionSearchHandler);
};


app.get('/api/discord/getinfo', async (req, res) => {
  try {
      const userId = req.query.id;

      if (!userId) {
          return res.status(400).json({ 
              error: 'User ID is required',
              message: 'Please provide a valid Discord user ID in the query parameter'
          });
      }

      const response = await fetch(`https://aurix.luau.tech/api/discord-user/${userId}`);
      
      if (!response.ok) {
          return res.status(response.status).json({
              error: 'Failed to fetch user details',
              status: response.status,
              statusText: response.statusText
          });
      }
      const userData = await response.json();

      res.set({
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': 'GET',
          'Content-Type': 'application/json'
      });

      res.json(userData);

  } catch (error) {
      console.error('Discord User Info Error:', error);
      res.status(500).json({
          error: 'Internal Server Error',
          message: error.message
      });
  }
});

const setupErrorHandlers = () => {
  app.use(async (req, res) => {
    res.status(404);
    await serveErrorPage(res, '404', 'Page Not Found');
  });

  app.use(async (err, req, res, next) => {
    console.error(err);
    res.status(500);
    await serveErrorPage(res, '500', 'Internal Server Error');
  });
};

const start = async () => {
  setupRoutes();
  setupErrorHandlers();
 
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

start();
