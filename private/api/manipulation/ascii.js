const figlet = require('figlet');

const asciiHandler = async (req, res) => {
        const text = req.query.text;
        figlet(text, (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error generating ASCII art');
          }
      
          res.setHeader('Content-Type', 'text/plain');
          res.send(data);
        });
    };

module.exports = { asciiHandler };