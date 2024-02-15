const express = require('express');
const { crearUsuario, loginUsuario } = require('../controllers/authControllers');

const routerAuth = express.Router();

routerAuth.post('/login', loginUsuario);

routerAuth.post('/registro', crearUsuario);

//exportar archivo
module.exports = routerAuth;
