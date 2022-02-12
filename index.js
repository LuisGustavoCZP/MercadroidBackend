const port = 8000;
const path = __dirname;

const express = require("express");
const fs = require("fs");
//const { redirect } = require("express/lib/response");
const cors = require('cors');
const app = express();

/* app.use(express.static(path)); */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

/* let allowCrossDomain = function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain); */

let users = LoadUsers();
const userSessions = [];
//userSessions["127.0.0.1"] = { "ip":"127.0.0.1", "id":0 };
//userSessions["::1"] = { "ip":"::1", "id":0 };

const dateToday = new Date ();

function LoadUsers () 
{
    const lusers = [];
    const files = fs.readdirSync("data/users");
    console.log(`Loaded ${files.length} users`);
    files.forEach(f => 
    {
        const user = JSON.parse(fs.readFileSync("data/users/"+f));
        lusers[user.id] = user;
        //console.log(`User: ${user}`);
    });
    return lusers;
}

function SearchUser (username)
{
    for(id in users)
    {
        const user = users[id];
        if(user.login == username) return id;
    }
}

app.get("/", (req, res) => 
{
    console.log(`Conexão ${req.ip} iniciada...`);
    if(userSessions[req.ip]) {
        console.log(`Conexão ${req.ip} foi um sucesso ;)`);
        res.redirect(`/${userSessions[req.ip].id}`);
    } else {
        console.log(`Conexão ${req.ip} foi redirecionada :)`);
        res.send("-1");
    }
    //res.json({"r":[]});
});

app.options('/user', cors());
app.post("/user", (req, res) => 
{
    const username = req.body["user"], password = req.body["pass"];
    if(username == "") 
    {
        console.log(`Conexão ${req.ip} sem username!`);
        res.send(`-3`);
        return;
    }
    if(password == "") 
    {
        console.log(`Conexão ${req.ip} sem password!`);
        res.send(`-2`);
        return;
    }

    const userid = SearchUser(username);
    if(password != users[userid].pass) 
    {
        console.log(`Conexão ${req.ip} password errado!`);
        res.send(`-1`);
        return;
    }

    console.log(`Conexão ${req.ip} direcionado para area de usuario e ${username}`);
    const session = {"ip":`${req.ip}`, "userid":userid};
    userSessions[session.ip] = session;
    
    res.send(`${session.userid}`);
    //res.json({"r":[]});
});

app.get("/:id/", (req, res) => 
{
    console.log(req.params);
    res.json({"id":req.params["id"]});
});

app.get("/:id/categories", (req, res) => 
{
    const id = req.params["id"];
    console.log(id);
    res.json({categories:categories});
});

app.get("/:id/products", (req, res) => 
{
    const id = req.params["id"];
    console.log(id);
    res.json({products:products});
});

app.get("/:id/wallet", (req, res) => 
{
    const id = req.params["id"];
    console.log(id);
    
    res.json({"wallet":users[id].wallet});
});

app.get("/:id/markets", (req, res) => 
{
    console.log(req.query);
    res.json({markets:markets});
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})