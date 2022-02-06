const port = 8000;
const path = `${__dirname}/src`;

const express = require("express");
const app = express();

app.use(express.static(path));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const d = new Date ();
const categories = [
    {"id":0, "name":"Category A"},
    {"id":1, "name":"Category B"},
    {"id":2, "name":"Category C"},
];

const products = [
    {"id":0, "name":"Produto A", "categoryID":0, "quantyType":"L"},
    {"id":1, "name":"Produto B", "categoryID":0, "quantyType":"G"}
];

const wallet = {"money":"200", "currency":"R$"}

const markets = [
    {
        itens:[
            {"id":0, "productID":0, "price":5},
            {"id":1, "productID":1, "price":6}
        ],
        cart:[
            {"id":0, "productID":0, "quanty":1}
        ]
    }
];

app.get("/", (req, res) => 
{
    console.log(req.query);
    res.json({products:products});
});

app.get("/categories", (req, res) => 
{
    console.log(req.query);
    res.json({categories:categories});
});

app.get("/products", (req, res) => 
{
    console.log(req.query);
    res.json({products:products});
});

app.get("/wallet", (req, res) => 
{
    console.log(req.query);
    res.json(wallet);
});

app.get("/markets", (req, res) => 
{
    console.log(req.query);
    res.json({markets:markets});
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})