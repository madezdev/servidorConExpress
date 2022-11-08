const Container = require('./clase');
const moment = require('moment');
const express = require('express');
const { clearScreenDown } = require('readline');

const app = express();
const PORT = 8030;

const productos = new Container('./productos.json');

const visitas = {
    productos: 0,
    fecha_ingreso_productos: '',
    prod_random: 0,
    fecha_ingreso_products_random: ''
}

app.get('/productos', async (req, res) => {
    visitas.productos++
    visitas.fecha_ingreso_productos = moment().format('MMMM Do YYYY, h:mm:ss a');
    const prods = await productos.getAll();
    res.send({ Productos: prods })
    console.log('Productos listados correctamente');
})

app.get('/random', async (req, res) => {
    visitas.prod_random++
    visitas.fecha_ingreso_products_random = moment().format('MMMM Do YYYY, h:mm:ss a');
    const prods = await productos.getAll();
    const random = parseInt(Math.random() * prods.length)
    res.send({ Productos: prods[random] })
    console.log('Producto random listado correctamente');
})

app.get('/visitas', (req, res) => {
    res.send({ visitas })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})
