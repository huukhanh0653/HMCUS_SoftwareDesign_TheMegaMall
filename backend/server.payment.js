const httpsServer = require('./app.payment')
const dotenv = require('dotenv')
dotenv.config();

const connectMongooseDb = require('./db/connectMongooseDb');

const PORT = process.env.PORTPAYMENT || 3001;

connectMongooseDb();

httpsServer.listen(PORT);