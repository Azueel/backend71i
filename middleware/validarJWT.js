const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
	//recibimos el token atravez de los header y definimos un nombre
	const token = req.header('x-token');

	//si no recibimos un token, ejemplo lo borraron tiramos un error
	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la peticion',
		});
	}

	try {
		//verificamos si el token aun es valido si es valido cumple y llama a next
		const payload = jwt.verify(token, process.env.SECRET_JWT);
	} catch (error) {
		//si el token es invalido cae aca, en caso que se vencio
		return res.status(401).json({
			msg: 'Token no valido',
		});
	}

	//next deja ejecutar el siguiente middleware y si no hay mas ejecuta la funcion del flujo
	next();
};

module.exports = { validarJWT };
