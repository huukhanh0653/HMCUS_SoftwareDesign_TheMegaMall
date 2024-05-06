const mongoose = require('mongoose');

const DB = process.env.DATABASE
  .replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD)
  .replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

console.log(DB)

const connectMongooseDb = async () => {
  try {
    console.log(`MongoDB is Connecting ...`);
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB is Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectMongooseDb;