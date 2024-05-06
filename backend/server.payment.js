const httpsServer = require('./app.payment')
const dotenv = require('dotenv')
dotenv.config();

const connectMongooseDb = require('./db/connectMongooseDb');

const PORT = process.env.PORTPAYMENT || 3001;

httpsServer.listen(PORT, () => {
    console.log(`Server Payment is running on port http://localhost:${PORT}/`);
    connectMongooseDb();
});