const mongoose = require('mongoose');

const connectMongooseDb = async () => {
  try {
    console.log(`MongoDB is Connecting ...`);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectMongooseDb;