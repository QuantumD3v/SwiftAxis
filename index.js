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

// Old Code
// Encrypt endpoint
// app.get('/api/util/base64', (req, res) => {
//     const text = req.query.e || '';
//     const encodedText = Buffer.from(text).toString('base64');
//     res.json({ "test": text, "base64": encodedText });
// });

// Decrypt endpoint
// app.get('/api/util/base64', (req, res) => {
//     const b64Text = req.query.d || '';
//     const decodedText = Buffer.from(b64Text, 'base64').toString('utf-8');
//     res.json({ "base64": b64Text, "text": decodedText });
// });

// New Code
// Single Base64 endpoint
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

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
