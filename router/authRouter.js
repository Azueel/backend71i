const express = require('express');
const { crearUsuario, loginUsuario } = require('../controllers/authControllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const routerAuth = express.Router();

routerAuth.post('/login', loginUsuario);

routerAuth.post(
	'/registro',
	[check('email', 'No es un Email valido').not().isEmpty().isEmail(), validarCampos],
	crearUsuario
);

//exportar archivo
module.exports = routerAuth;
