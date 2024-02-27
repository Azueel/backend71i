const express = require('express');
const { validarJWT } = require('../middleware/validarJWT');

const {
	crearProducto,
	listaProductos,
	editarProducto,
	eliminarProducto,
	listaUsuarios,
} = require('../controllers/adminControllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const routerAdmin = express.Router();

routerAdmin.get('/tablaProductos', validarJWT, listaProductos);

//un middleware es ni mas ni menos que una funcion que se ejecuta antes del flujo de la ruta
//validarJWT se va a ejecutar antes, si no pasa la validacion del token no sigue ejecutando la funcion siguiente en el caso que el token sea valido se ejecuta ahora si la funcion correspondiente al flujo
routerAdmin.post(
	'/crearProducto',
	[
		validarJWT,
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('precio', 'por favor ingrese un valor').not().isEmpty(),
		check('descripcion', 'la descripcion no es valida').isLength({
			min: 5,
		}),
		validarCampos,
	],
	crearProducto
);

routerAdmin.get('/tablaUsuarios', validarJWT, listaUsuarios);

routerAdmin.put('/editar', validarJWT, editarProducto);

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

//exportar archivo
module.exports = routerAdmin;
