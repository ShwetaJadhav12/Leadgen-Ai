
const fs = require("fs");
const pdf = require("pdf-parse");
const { extractLeadInfo } = require("../services/geminiService");

exports.uploadPDF = async (req, res) => {
  try {
    console.log("1. Request received");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    console.log("2. PDF uploaded");

    const dataBuffer = fs.readFileSync(req.file.path);

    console.log("3. PDF read");

    const pdfData = await pdf(dataBuffer);

    console.log("4. PDF parsed");

    const aiResponse = await extractLeadInfo(pdfData.text);

    console.log("5. Gemini finished");

    res.json({
      success: true,
      lead: aiResponse,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};