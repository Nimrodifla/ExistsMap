let express = require("express");
var app = express();

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res)=>{
    res.sendFile(__dirname + '/style.css');
});

app.get('/script.js', (req, res)=>{
    res.sendFile(__dirname + '/script.js');
});

app.get('/Icons/:file', (req, res)=>{
    let file = req.params.file;
    res.sendFile(__dirname + '/Icons/' + file);
})

app.listen(process.env.PORT, (err)=>{
    if (err)
        throw err;

    console.log("OK!");
})