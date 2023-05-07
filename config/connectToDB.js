import mongoose from 'mongoose';
import dotenv from 'dotenv';
/**
 * Here we are connecting our server to mongoDB Cloud database
 */
export const connectDB = async() => {
    // Databse connection
    try{
        const connectDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected :" + connectDB.connection.host)
    }
    catch(err){
        console.log("Error :" + err.message)
        process.exit();
    }
}