// app create
const express = require("express");
const app = express();

// port find
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware addition
app.use(express.json());
const fileupload = require("express-fileupload"); // help to uplod file on server
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// app.use(fileUpload());

// connet to db
const db = require("./config/database");
db.connect();

// connect to cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//upi route mounting
const Upload = require("./routes/Fileupload");
app.use('/api/v1/upload',Upload);

//activating server
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`);
})
