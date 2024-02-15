//forma de importar en node
const express = require('express');
const { dbConnetion } = require('./database/config');
const cors = require('cors');
// import express from 'express';
require('dotenv').config();
const app = express();

//lectura y parseo del body
app.use(express.json());

//cors
app.use(cors());

dbConnetion();

app.use('/auth', require('./router/authRouter'));
app.use('/admin', require('./router/adminRouter'));

app.listen(process.env.PORT, () => {
	console.log(`ejecutandose en el puerto ${process.env.PORT}`);
});
