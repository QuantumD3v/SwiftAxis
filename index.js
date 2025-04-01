const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
// Serve static files (CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/css', (req, res) => {
  const directoryPath = path.join(__dirname, 'public', 'css');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    res.send(files);
  });
});

app.get('/js', (req, res) => {
  const directoryPath = path.join(__dirname, 'public', 'js');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    res.send(files);
  });
});

app.get('/sudo', (req, res) => {
  const directoryPath = path.join(__dirname, 'private');
  const encodedUser = req.query.u;

  if (!encodedUser) {
    return res.status(400).send('Missing user parameter');
  }

  try {
    // Decode the Base64-encoded user
    const decodedUser = Buffer.from(encodedUser, 'base64').toString();

    // Check if the decoded user is allowed
    if (decodedUser !== 'ccelestia') {
      return res.status(403).send('You are not authorized to access this directory');
    }

    // Read the directory if the user is authorized
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).send('Unable to scan directory');
      }
      res.send(files);
    });
  } catch (error) {
    // Handle invalid Base64 strings
    return res.status(400).send('Invalid Base64-encoded user parameter');
  }
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