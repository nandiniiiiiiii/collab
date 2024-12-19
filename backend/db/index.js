const mongoose = require('mongoose');
require('dotenv').config();

//connecting mongoodb with node
const connectDB = async() =>{
    const DB_NAME = "collab"
    console.log(process.env.MONGODB_URI)
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB not found ",error);
        process.exit(1);
    }
}

// export default connectDB;
module.exports = connectDB;