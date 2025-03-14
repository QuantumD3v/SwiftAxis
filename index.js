const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
// Serve static files (CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Files route
app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'public');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    res.send(files);
  });
});

// Default Route
app.get('/', (req, res) => {
  res.send({
    message: 'No requests on url',
    info: 'Powered By NodeJS',
    made: 'Made On NodeJS',
    runner: 'Running on Vercel',
    isjoy: 'ENJOY'
  });
});

// Serve the HTML file at /ny
app.get('/ny/en', (req, res) => {
  const filePath = path.join(__dirname, 'secret', 'ny', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the HTML file.');
      return;
    }
    res.send(data); // Send the content of index.html
  });
});

app.get('/ny/th', (req, res) => {
  const filePath = path.join(__dirname, 'secret', 'nyt', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the HTML file.');
      return;
    }
    res.send(data); // Send the content of index.html
  });
});

// Endpoint to get the current date and time
app.get('/api/tdrt', (req, res) => {
  const currentDateTime = new Date();
  const options = { timeZone: 'Asia/Bangkok', hour12: false };
  const date = currentDateTime.toLocaleDateString('en-GB', options);
  const time = currentDateTime.toLocaleTimeString('en-GB', options);

  res.set('Cache-Control', 'no-store'); // Ensure the response is not cached
  res.json({
    date: date,
    time: time
  });
});
// Base64 encoding/decoding endpoint
app.get('/api/util/base64', (req, res) => {
  const encodeText = req.query.e;
  const decodeText = req.query.d;

  if (encodeText) {
    const encodedText = Buffer.from(encodeText).toString('base64');
    res.json({ "original": encodeText, "base64": encodedText });
  } else if (decodeText) {
    const decodedText = Buffer.from(decodeText, 'base64').toString();
    res.json({ "base64": decodeText, "original": decodedText });
  } else {
    res.status(400).json({ "error": "Please provide either ?e= to encode or ?d= to decode." });
  }
});

// Export the Express app to work with Vercel's serverless functions
module.exports = app;

//I use this for testing in my machines
app.listen(port, '0.0.0.0', () => {
   console.log(`Server is running on http://0.0.0.0:${port}`);
});