const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// local file upload handler function

exports.localFileUpload = async(req,res) => {
    try{
        // fetch file
        const file = req.files.file;
        console.log("file -> ",file);

        let path = __dirname + "/files/" + Date.now()+`.${file.name.split('.')[1]}`;
        console.log("path -> ",path);

        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:true,
            message:"Local file uploaded sucessfully.",
        });
    }
    catch(error){
        console.log("problem in uploding local file.")
        console.log(error);
    }
}


async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    console.log("uploadTo cloudinary function k under aa gaya");
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
// image upload

exports.imageUpload = async (req,res) => {
    try{
        // fetch data
        const { name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log("file -> ",file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format is not supported",
            });
        }
        console.log("validate to ho gaya");

        const response = await uploadFileToCloudinary(file,"fileUpload");
        console.log("uploadTocoudinary function k baad");
        console.log(response);
        // save entry to db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"Successfully uploaded image on the cloud",
        });   
    }   
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong while uploading image to cloud',
        });
    }
}

// video upload 

exports.videoUpload= async(req,res) => {
    try{
        // fetch data
        const { name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.videoFile;
        console.log("file -> ",file);

        // validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format is not supported",
            });
        }
        console.log("validate to ho gaya");

        const response = await uploadFileToCloudinary(file,"fileUpload");
        console.log("uploadTocoudinary function k baad");
        console.log(response);
        // save entry to db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"Successfully uploaded video on the cloud",
        });  

    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"Something went wrong while uploading video to the cloud",
        });
    }
}

// image size reducer 

exports.imageSizeReducer = async (req,res) => {
    try{
        // fetch data
        const { name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log("file -> ",file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format is not supported",
            });
        }
        console.log("validate to ho gaya");

        const response = await uploadFileToCloudinary(file,"fileUpload",30);
        console.log("uploadTocoudinary function k baad");
        console.log(response);
        // save entry to db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"Successfully uploaded reduced image on the cloud",
        }); 
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"Something went wrong while uploading reduced image to the cloud",
        });
    }
}