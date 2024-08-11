const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req,res)=> {
    res.send({message:'No requests on url',
        info:'Powered By NodeJS',
        made:'Made On NodeJS',
        runner:'Running on Vercel'
    });
});

app.get('/api/v1/json1', (req, res) => {
    res.sendFile(path.join(__dirname, 'json1.json'));
});

//app.get('/json', (req, res) => {
//    fs.readFile('json1.json', 'utf8', (err, data) => {
//        if (err) {
//            // If there's an error reading the file, send an error response
//            console.error('Error reading use.json:', err);
//            res.status(500).send('Internal Server Error');
//            return;
//        }
//        // Send the contents of the use.json file as a JSON response
//        res.json(JSON.parse(data));
//    });
//});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
