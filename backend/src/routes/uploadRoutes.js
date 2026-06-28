const express=require("express");

const router=express.Router();

const upload=require("../middleware/upload");

const {

uploadPDF

}=require("../controllers/uploadController");

router.post(

"/pdf",

upload.single("pdf"),

uploadPDF

);

module.exports=router;