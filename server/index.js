const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config(); // Used to call env variables in the file (Read docs on npm site)

app.use(cors);
app.use(express.json());

mongoose.connect(process.env.MONGO_URL ,{
    useNewURLParser : true,
    useUnifiedTopology : true,
})
.then(() => {
    console.log("Connection established with the DB.")
})
.catch((err) => {
    console.log(err);
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`) // See how we used ` ` in the log line because that enables us to write variables directly into the string. These are called template literals. 
});