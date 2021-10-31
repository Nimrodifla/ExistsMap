let express = require("express");
var app = express();

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT, (err)=>{
    if (err)
        throw err;

    console.log("OK!");
})