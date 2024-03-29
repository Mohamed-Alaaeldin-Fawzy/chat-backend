import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    auth: {
        password: {type:String, required: true , select:false},
        salt:{type:String,   select:false}   ,
        sessionToken:{type:String,   select:false}
    }    
})

export const User = mongoose.model("User", UserSchema)  ;