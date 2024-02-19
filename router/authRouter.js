const express = require('express');
const {
	crearUsuario,
	loginUsuario,
	listaUsuarios,
} = require('../controllers/authControllers');

const routerAuth = express.Router();

routerAuth.post('/login', loginUsuario);

routerAuth.post('/registro', crearUsuario);

routerAuth.get('/listaUsuarios', listaUsuarios);

//exportar archivo
module.exports = routerAuth;
