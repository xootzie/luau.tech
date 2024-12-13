const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



app.get('/build', (req, res) => {
  const userAgent = req.get('User-Agent');
  
  const isBrowser = userAgent && (
    userAgent.includes('Mozilla') || 
    userAgent.includes('Chrome') || 
    userAgent.includes('Safari') || 
    userAgent.includes('Firefox') || 
    userAgent.includes('Edge') || 
    userAgent.includes('Trident')
  );

    console.log(userAgent);
    console.log(isBrowser);
    
  if (isBrowser) {
    return res.redirect('/');
  }

  res.type('application/x-httpd-lua');
  res.sendFile(path.join(__dirname, 'public', 'build'));
});


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

  app.post('/api/array/validate', arrayValidateRoute.arrayValidateHandler);
  app.get('/api/text/asciify', asciiRoute.asciiHandler);
  app.get('/api/roblox/tax-calculate', taxCalculatorRoute.taxCalculator);
  app.get('/api/roblox/executors/list', executorListRoute.robloxListHandler);
  app.get('/api/roblox/executors/search', executorSearchRoute.executorSearchHandler);
  app.get('/api/roblox/version/search', versionSearchRoute.versionSearchHandler);
};

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
    console.log(`Server running http://localhost:${port}`);
  });
};

start();