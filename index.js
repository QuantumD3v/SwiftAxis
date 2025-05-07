const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// Serve React static files from the build folder
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client-2')));

// API endpoints (prefixed with /api)

// Example: Serve files from the public/css directory
app.get('/file/css', (req, res) => {
  const directoryPath = path.join(__dirname, 'public', 'css');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    res.send(files);
  });
});

// Example: Serve files from the public/js directory
app.get('/file/js', (req, res) => {
  const directoryPath = path.join(__dirname, 'public', 'js');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    res.send(files);
  });
});

app.get('/arch', (req, res) => {
  const directoryPath = path.join(__dirname, 'arch');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    res.send(files);
  });
});

// Base64 encoding/decoding endpoint under /api/util
app.get('/api/base64', (req, res) => {
  const encodeText = req.query.e;
  const decodeText = req.query.d;

  if (encodeText) {
    const encodedText = Buffer.from(encodeText).toString('base64');
    res.json({ original: encodeText, base64: encodedText });
  } else if (decodeText) {
    const decodedText = Buffer.from(decodeText, 'base64').toString();
    res.json({ base64: decodeText, original: decodedText });
  } else {
    res.status(400).json({ error: 'Please provide either ?e= to encode or ?d= to decode.' });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Catch-all route: serve the React app for any non-API route.
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//});

app.get('/', (req, res) => {
  res.send("Hello, World!");
});

// For testing or local development
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-2', 'index.html'));
});

// Export the Express app for deployment (e.g., Vercel serverless functions)
module.exports = app;
