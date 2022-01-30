const port = 3000;

const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => 
{
    const temp = {"id":0, "time":15};
    /* const data = JSON.stringify(temp);
    console.log(data); */
    res.json(temp);
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})