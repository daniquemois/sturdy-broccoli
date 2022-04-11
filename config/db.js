const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB - connected')
    } catch (error) {
        console.log('error occured while trying to connect to db', error);
        throw error;
    }
};

module.exports = connectDB;