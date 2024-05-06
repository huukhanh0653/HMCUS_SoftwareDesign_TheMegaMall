const httpsServer = require('./app.payment')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')

dotenv.config({
    path: './config.env'
});

const PORT = process.env.PORTPAYMENT || 3001;

connectDB();

httpsServer.listen(PORT);