const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser())
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

module.exports = app;