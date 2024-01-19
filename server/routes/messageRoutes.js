// Routes handling
const { addMessage, getAllMessages } = require("../controllers/messagesController")

const router = require("express").Router();

router.post("/addMsg/", addMessage)
router.post("/getAllMsgs/", getAllMessages)

module.exports = router; 