// Logic
const User = require("../models/userModel")
const bycrypt = require("bcrypt")

// Register
module.exports.register = async (req, res, next) => {
try
{
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if(usernameCheck)
    {
        return res.json({msg : "Username not available", status : false});
    }
    const emailCheck = await User.findOne({ email });
    if(emailCheck)
    {
        return res.json({msg : "Username not available", status : false});
    }
    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await User.create({
        email, 
        username,
        password : hashedPassword,
    });

    delete user.password;
    return res.json({ status : true, user})
}
catch(err)
{
    next(err);
    // Passes the request to next if error or exception is caused 
}
}

// Login
module.exports.login = async (req, res, next) => {
    try
    {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user)
        {
            return res.json({msg : "User is not valid", status : false});
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if(!isPasswordValid)
        {
            return res.json({msg : "Password is not valid", status : false});
        }
        delete user.password;
        return res.json({ status : true, user})
    }
    catch(err)
    {
        next(err);
    }
    }

module.exports.setAvatar = async (req, res, next) => {
        try{
            const userID = req.params.id; // Used to access parameters which are encoded with URL
            const avatarImage = req.body.image; // Used to access the content of the request

            const userData = await User.findByIdAndUpdate( userID , { 
                isAvatarImageSet : true, 
                avatarImage,
            });

            return res.json({isSet : userData.isAvatarImageSet, 
            userImage : userData.avatarImage,
            });

        }catch(err)
        {
            next(err);
        }
    }

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({ _id : { $ne:req.params.id} }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(users);
    }catch(err)
    {
        next(err);
    }
}