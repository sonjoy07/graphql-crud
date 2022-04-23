
const mongoose = require('mongoose')

const connectDB = async()=>{
    const  mongoAtlasUri = "mongodb+srv://sonjoy:sonjoy@123456@cluster0.ltxp5.mongodb.net/test?retryWrites=true&w=majority";
    try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

    } catch (e) {
    console.log("could not connect");
    }
}
module.exports = connectDB