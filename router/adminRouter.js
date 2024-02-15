const express = require('express');

const routerAdmin = express.Router();

routerAdmin.get('/tablaProductos', (req, res) => {
	res.send('Tabla enviada correctamente');
});

routerAdmin.post('/crearProducto', (req, res) => {
	res.send('Producto Creado');
});

//exportar archivo
module.exports = routerAdmin;
