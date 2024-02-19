const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
	const { name, email, password } = req.body;
	console.log(req.body.password);
	//validar
	if (!name || !email || !password) {
		return res.status(400).json({
			msg: 'Todos los campos son obligatorios',
		});
	}
	// } else if (password < 5) {
	// 	return res.status(400).json({
	// 		msg: ' la contraseña debe ser mayor a 5 caracteres',
	// 	});
	// }

	try {
		//analizamos si el correo ingresado no esta registrado
		let usuario = await Usuario.findOne({ email });

		//si el correo se encontro lo rechazamos
		if (usuario) {
			return res.status(400).json({
				msg: 'Un Usuario ya existe con este correo',
			});
		}
		//en el caso que no exista el correo, creamos una instancia
		usuario = new Usuario(req.body);

		//encriptar contraseña
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		//guardamos en la base de datos
		await usuario.save();

		res.status(201).json({
			msg: 'Usuario Registrado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error en el servidor comunicarse con un administrador',
		});
	}
};

const loginUsuario = async (req, res) => {
	const { email, password } = req.body;
	//validan datos

	try {
		let usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(400).json({
				msg: 'El Correo ingresado no se encuentra',
			});
		}

		const validarPassword = bcrypt.compareSync(password, usuario.password);

		if (!validarPassword) {
			return res.status(400).json({
				msg: 'La contraseña es incorrecta',
			});
		}

		res.status(200).json({
			msg: 'Usuario Logueado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error en el servidor comunicarse con un administrador',
		});
	}
};

const listaUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();
		res.status(200).json({
			msg: 'Usuarios enviados',
			usuarios,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con el administrador',
		});
	}
};

module.exports = {
	crearUsuario,
	loginUsuario,
	listaUsuarios,
};
