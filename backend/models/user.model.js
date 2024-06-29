import mongoose, { Mongoose, model } from "mongoose";

const userSchema= new mongoose.Schema({
   
    
    cpassword:{type:String},
    password:{type:String},
    username:{type:String}
   
})

export default mongoose.model.users || mongoose.model('user',userSchema)
