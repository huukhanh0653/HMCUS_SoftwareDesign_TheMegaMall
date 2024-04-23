const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const connectMongooseDb = require('./db/connectMongooseDb');

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
    connectMongooseDb();
});