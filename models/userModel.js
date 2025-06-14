
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required : true,
        unique: true
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    profilepic : {
        type : String,
        default : "https://freesvg.org/img/abstract-user-flat-3.png"
    },

})

const User = mongoose.model("users", UserSchema)

export default User;
