import mongoose from "mongoose";

export const connectDB = async (mongoUri : string): Promise<void> =>{
    try{
        await mongoose.connect(mongoUri);
        console.log("Polaczono z mongodb")
    }catch(error){
        console.log("Blad polaczenia", error);
        process.exit(1);
    }
}