const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// Serve React static files from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

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

// Example: Sudo directory listing (with Base64 auth) under /api
app.get('/api/sudo', (req, res) => {
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
    return res.status(400).send('Invalid Base64-encoded user parameter');
  }
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

// For testing or local development
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

// Export the Express app for deployment (e.g., Vercel serverless functions)
module.exports = app;
