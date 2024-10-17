const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

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

// Encrypt endpoint
app.get('/api/util/encrypt', (req, res) => {
    const text = req.query.t || '';
    const encodedText = Buffer.from(text).toString('base64');
    res.json({ "test": text, "base64": encodedText });
});

// Decrypt endpoint
app.get('/api/util/decrypt', (req, res) => {
    const b64Text = req.query.b64 || '';
    const decodedText = Buffer.from(b64Text, 'base64').toString('utf-8');
    res.json({ "base64": b64Text, "text": decodedText });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
