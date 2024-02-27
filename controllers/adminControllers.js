const Producto = require('../model/producto-model');
const Usuario = require('../model/usuario-model');

const crearProducto = async (req, res) => {
	const { name, precio, descripcion } = req.body;

	//validaciones
	//...
	//fin de las validaciones

	const producto = new Producto(req.body);

	await producto.save();

	res.status(201).json({
		msg: 'producto creado',
	});
};

const listaProductos = async (req, res) => {
	const listaProductos = await Producto.find();

	res.status(200).json({
		msg: 'lista de productos enviada',
		listaProductos,
	});
};

const listaUsuarios = async (req, res) => {
	const listaUsuarios = await Usuario.find();

	res.json({
		msg: 'lista de Usuarios enviada',
		listaUsuarios,
	});
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Producto.findById(req.body._id);

		if (!productoEditar) {
			return res.status(400).json({
				msg: 'no existe un producto con este ID',
			});
		}

		await Producto.findByIdAndUpdate(req.body._id, req.body);
		res.json({
			msg: 'producto editado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor comunicarse con el administrador',
		});
		console.log(error);
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Producto.findById(req.params.id);

		if (productoEliminar == undefined) {
			return res.status(400).json({
				msg: 'No existe ningun Producto con este ID',
			});
		}

		await Producto.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'producto Eliminado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor comunicarse con el administrador',
		});
		console.log(error);
	}
};

module.exports = {
	crearProducto,
	listaUsuarios,
	listaProductos,
	editarProducto,
	eliminarProducto,
};
