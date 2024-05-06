const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')

dotenv.config({
    path: './config.env'
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
    connectDB();
})