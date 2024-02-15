const mongoose = require('mongoose');

const dbConnetion = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);
		console.log('db conectado');
	} catch (error) {
		console.log(error);
	}
};

module.exports = { dbConnetion };
