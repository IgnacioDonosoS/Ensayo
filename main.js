const express = require("express")
const app = express()
cors = require('cors')

const {
    getTiendas,
    getCategorias,
    getMarcas,
    getDetails,
    getFiltro
} = require("./public/consultas/consultas.js")

app.use(express.static("public/"))
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({
    extended: true
}));
app.listen(3000);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/getTiendas", async (req, res) => {
    let tiendas = await getTiendas()
    res.send(tiendas)
})

app.get("/api/getCategorias", async (req, res) => {
    let categorias = await getCategorias()
    res.send(categorias)
})
app.get("/api/getMarcas", async (req, res) => {
    let marcas = await getMarcas()
    res.send(marcas)
})
app.get("/api/getDetails", async (req, res) => {
    let details = await getDetails()
    res.send(details)
})

app.get("/api/getFiltro", async (req, res) => {
    let { tienda } = req.query;
    let { categoria } = req.query;
    let { marca } = req.query;
    let filtro = await getFiltro(tienda, categoria, marca)
    console.log(filtro)
    res.send(filtro)
})