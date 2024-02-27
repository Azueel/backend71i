const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	precio: {
		type: String,
		required: true,
	},

	descripcion: {
		type: String,
		required: true,
	},
});

module.exports = model('Producto', ProductoSchema);
