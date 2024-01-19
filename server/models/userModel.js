const mongoose = require("mongoose");

// mongoose.Scheme was required
// Users is a mongoose collection and are equivalent to tables in SQL
// Document is an entry in the collection
// Then comes field that is obvious by its name.
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 3,
        max : 20,
        unique : true,
    }, 
    email : {
        type : String,
        unique : true, 
        required : true,
        max : 50,
    },
    password : {
        type : String,
        required : true,
        min : 8,
    },
    isAvatarImageSet : {
        type : Boolean, 
        default : false,
    },
    avatarImage : {
        type : String,
        default : "",
    },
});

module.exports = mongoose.model("Users", userSchema);