import mongoose, { Mongoose, model } from "mongoose";

const movieSchema= new mongoose.Schema({
   
    name:{type:String},
    category:{type:String},
    Likes:{type:String},
    profile:{type:String},
    banner:{type:String}
 
})

export default mongoose.model.movies || mongoose.model('movie',movieSchema)
