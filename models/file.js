const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    imageUrl:{
        type:String,
    },
    email:{
        type:String,
    },
    tags:{
        type:String,
    }
});

// post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC ", doc)

        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });
        let info =await transporter.sendMail({
            from:
            to:
            subject:
            html:
        });
    }
    catch(error){
        console.error(error);
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;