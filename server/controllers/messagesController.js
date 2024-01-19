const Message = require("../models/messageModel")

module.exports.addMessage = async (req, res, next) => {
try{
    const { to, from, message } = req.body;
    const { data } = await Message.create({
        message : {text : message},
        users : [to, from],
        sender : from,
    })

    if(data) return res.json({msg : "Added to database successfully!"});
    return res.json({msg : "Failed to add to database!"});
} catch(err){
    next(err);
}
}

module.exports.getAllMessages = async (req, res, next) => {
try{
    const { from, to } = req.body;
    const messages = await Message.find({
        users : {
            $all : [to, from],
        },
    })
    .sort({ updatedAt : 1 });

    const projectMessages = messages.map((msg) => {
        return {
            fromself : msg.sender.toString() === from,
            message : msg.message.text,
        };
    })

    res.json(projectMessages);

} catch(err)
{
    next(err)
}
}