const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('Database Disconnected');
    }
};

module.exports = connectDB