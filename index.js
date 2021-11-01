let express = require("express");
var mysql = require('mysql');
var app = express();

const db = mysql.createPool({
        
    host: "eu-cdbr-west-01.cleardb.com",
    user: "b180ad423bf4f9",
    password: "91d13188",
    database: "heroku_53994a8cea6a400"

});

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
});

app.get('/exits', (req, res)=>{
    db.query("SELECT * FROM heroku_53994a8cea6a400.exits; ", (err, result)=>{
        if (err)
            throw err
        
        res.send(result);
    })
});

app.get('/submition/:id/:state', (req, res)=>{
    let id = req.params.id;
    let state = req.params.state;

    if (state == 1 || state == 0)
    {
        db.query("UPDATE `heroku_53994a8cea6a400`.`exits` SET `state` = '" + state + "' WHERE (`id` = '" + id + "');", (err, result)=>{
            if (err)
                throw err;
            
            res.send("200");
        });
    }

    res.send("404");
});

app.listen(process.env.PORT || 80, (err)=>{
    if (err)
        throw err;

    console.log("OK!");
})