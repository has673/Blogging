const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Connected To MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error in MongoDB ${error}`);
  }
};

module.exports = {
  connectDB,
};
