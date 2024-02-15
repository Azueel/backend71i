const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		unique: true,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	rol: {
		type: String,
		default: 'usuario',
	},
});

module.exports = model('Usuario', UsuarioSchema);
