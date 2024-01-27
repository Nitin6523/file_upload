const express = require("express");
router = express.Router();

const {imageUpload, videoUpload, imageSizeReducer, localFileUpload} = require("../controllers/fileUpload");

// api routes 
router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);
router.post('/imageSizeReducer',imageSizeReducer);


module.exports = router;