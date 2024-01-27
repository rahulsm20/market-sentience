import mongoose from "mongoose";

const connectToDB=async(url:string)=>{
    try{
      await  mongoose.connect(url);
    }
    catch(error){
        console.log(error)
    }
    finally{
        console.log('Connected to DB')
    }
}

export default connectToDB