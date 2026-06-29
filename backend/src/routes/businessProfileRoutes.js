const express = require("express");

const router = express.Router();

const {
  getBusinessProfile,
  saveBusinessProfile,
} = require("../controllers/businessProfileController");

router.get("/", getBusinessProfile);
router.put("/", saveBusinessProfile);

module.exports = router;
