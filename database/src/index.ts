import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.DATABASE_URL ;
  console.log(uri)
  if(!uri){
    console.log("db not found")
    return
  }
  await mongoose.connect(uri)
  console.log("Mongo connected");
}
const User = new Schema({
  name: {type:String,required:true,unique:true},
  email: {type: String, unique: true},
  password: {type:String,required:true},
  age:{type:Number,required:true}
});
