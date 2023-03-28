const Express = require('express');

const App = Express();

let Productos = [];

App.use (Express.urlencoded());

App.use (Express.json());


//Consultar datos de los productos.

App.get ('/Producto', (req, res) => {
    res.json(Productos)
});

//Agregar Productos.

App.post ('/Producto', (req, res) => {

    const NewP = {Id : Productos.length + 1, ...req.body}

    Productos.push(NewP);

    console.log ("El producto se subio");

    res.send(NewP)
})

//Agregar Actualizar.

App.put ('/Producto/:Id', (req, res) => {

    const {nombre, precio} = req.body;

    const Id = req.params.Id;

    const ProductoN = Productos.find ((Product) => Product.Id == Id)

    if (!ProductoN) return res.status(404).json ({
        Product : 'Producto no encontrado'
    })

    if (nombre) ProductoN.nombre = nombre

    if (precio) ProductoN.precio = precio

    res.send("Actualizado")

})

//Eliminar datos.

App.delete('/Producto/:Id', (req, res) => {

    const Id = req.params.Id;

    const ProductoN = Productos.filter ((Product) => Product.Id !=Id)

    res.send("Producto eliminado")
});

//Consultar por Id.

App.get ('/Producto/:Id', (req, res) => {

    const ProductoN = Productos.find ((Product) => Product.Id === parseInt (req.params.Id))

    if (!ProductoN) return res.status(404).json ({
        Product : 'Producto no encontrado'
    })

    res.json(ProductoN)
})

const Port = 1337;

const Host = "localhost";

App.listen(Port, Host, () => {
    console.log(`https://${Host} : ${Port}`)
})