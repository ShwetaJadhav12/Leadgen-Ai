const express=require("express");

const router=express.Router();

const upload=require("../middleware/upload");

const {

uploadPDF,
extractBusinessProfile

}=require("../controllers/uploadController");

router.post(

"/pdf",

upload.single("pdf"),

uploadPDF

);

router.post(

"/business-profile",

upload.single("pdf"),

extractBusinessProfile

);

module.exports=router;
