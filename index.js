const port = 8000;
const path = __dirname;

const express = require("express");
const { redirect } = require("express/lib/response");
const cors = require('cors');
const app = express();

/* app.use(express.static(path)); */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const userSessions = [];
userSessions["127.0.0.1"] = { "ip":"127.0.0.1", "id":0 };
userSessions["::1"] = { "ip":"::1", "id":0 };

const dateToday = new Date ();

app.get("/", (req, res) => 
{
    console.log(`Conexão ${req.ip} iniciada...`);
    if(userSessions[req.ip]) {
        console.log(`Conexão ${req.ip} foi um sucesso ;)`);
        res.redirect(`/${userSessions[req.ip].id}`);
    } else {
        console.log(`Conexão ${req.ip} foi redirecionada :)`);
        res.send("/user");
    }
    //res.json({"r":[]});
});

app.options('/user', cors())
app.post("/user", (req, res) => 
{
    console.log(`Conexão ${req.ip} direcionado para area de usuario e ${req.body}`);
    
    //res.json({"r":[]});
});

app.get("/:id/", (req, res) => 
{
    console.log(req.params);
    res.json({"id":req.params["id"]});
});

app.get("/:id/categories", (req, res) => 
{
    console.log(req.query);
    res.json({categories:categories});
});

app.get("/:id/products", (req, res) => 
{
    console.log(req.query);
    res.json({products:products});
});

app.get("/:id/wallet", (req, res) => 
{
    console.log(req.query);
    res.json(wallet);
});

app.get("/:id/markets", (req, res) => 
{
    console.log(req.query);
    res.json({markets:markets});
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})