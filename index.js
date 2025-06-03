const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // npm install mime
const app = express();
const port = 3001;

// Serve static CSS/JS
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// === Functions ===
const sendHTML = (filename, res) => {
  const filePath = path.join(__dirname, 'views', filename);
  res.sendFile(filePath);
};

// === API Endpoints ===

// Serve files from public/css
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

// Serve files from public/js
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

// Serve image URLs from public/img
app.get('/file/img', (req, res) => {
  const directoryPath = path.join(__dirname, 'public', 'img');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan directory');
      return;
    }
    const host = req.headers.host;
    const urls = files.map(file => `https://${host}/img/${file}`);
    res.json(urls);
  });
});

// Download file from /file
app.get('/api/dl/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'file', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }
    res.download(filePath, filename, (err) => {
      if (err) {
        res.status(500).send('Error downloading file');
      }
    });
  });
});

app.get('/arch/raw/:filename', (req, res) => {
  const filename = req.params.filename;

  // ป้องกัน path traversal เช่น ../
  if (filename.includes('..')) {
    return res.status(400).send('Invalid filename');
  }

  const filePath = path.join(__dirname, 'arch', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }

      // Force browser to display as raw text
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', 'inline');
      res.send(data);
    });
  });
});

// Base64 encode/decode
app.get('/api/base64', (req, res) => {
  const encodeText = req.query.e;
  const decodeText = req.query.d;

  if (encodeText) {
    const encoded = Buffer.from(encodeText).toString('base64');
    res.json({ original: encodeText, base64: encoded });
  } else if (decodeText) {
    const decoded = Buffer.from(decodeText, 'base64').toString();
    res.json({ base64: decodeText, original: decoded });
  } else {
    res.status(400).json({ error: 'Please provide either ?e= to encode or ?d= to decode.' });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// // Default root
// app.get('/', (req, res) => {
//   res.send("Hello, World!");
// });

app.get('/', (req, res) => sendHTML('personal.html', res));
app.get('/about', (req, res) => sendHTML('about.html', res));
app.get('/contact', (req, res) => sendHTML('contact.html', res));

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});

// Export app for deployment (e.g. Vercel)
module.exports = app;
