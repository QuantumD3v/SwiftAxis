const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static assets (CSS, JS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
    res.send({
        message: 'No requests on url',
        info: 'Powered By NodeJS',
        made: 'Made On NodeJS',
        runner: 'Running on Vercel',
        isjoy: 'ENJOY'
    });
});

// Serve json1.json
app.get('/api/v1/json1', (req, res) => {
    res.sendFile(path.join(__dirname, 'json1.json'));
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

// New route for /ny to serve the HTML file
app.get('/ny', (req, res) => {
    const filePath = path.join(__dirname, 'secret', 'ny', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the HTML file.');
            return;
        }
        res.send(data); // Send the content of index.html
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
