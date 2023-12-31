const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    profilePic:String,
    admin:{
        type:Boolean,
        default:false
    },
    email: String,
    password: String,
    phone:{
        type:String,
        require:true
    },
    pushNotificationToken:{
        type:String,
        default:null
    },
    messages:[]
});

// const User = new mongoose.model("User", userSchema);
const User = mongoose.models.User || new mongoose.model("User", userSchema);

module.exports = User;