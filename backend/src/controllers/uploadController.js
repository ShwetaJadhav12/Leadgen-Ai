
const fs = require("fs");
const pdf = require("pdf-parse");
const { extractBusinessProfile, extractLeadInfo } = require("../services/geminiService");
const { saveBusinessProfileRecord } = require("./businessProfileController");

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

async function fetchWebsiteText(url) {
  if (!url) {
    return "";
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}`);
  }

  const html = await response.text();

  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20000);
}

exports.extractBusinessProfile = async (req, res) => {
  try {
    const { companyWebsite, portfolioWebsite } = req.body;
    const sourceBlocks = [];

    if (req.file) {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdf(dataBuffer);
      sourceBlocks.push(`PDF Upload:\n${pdfData.text.slice(0, 20000)}`);
    }

    if (companyWebsite) {
      const companyText = await fetchWebsiteText(companyWebsite);
      sourceBlocks.push(`Company Website (${companyWebsite}):\n${companyText}`);
    }

    if (portfolioWebsite) {
      const portfolioText = await fetchWebsiteText(portfolioWebsite);
      sourceBlocks.push(`Portfolio Website (${portfolioWebsite}):\n${portfolioText}`);
    }

    if (sourceBlocks.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Upload a PDF or provide at least one website URL.",
      });
    }

    const profile = await extractBusinessProfile(sourceBlocks.join("\n\n---\n\n"));
    const savedProfile = await saveBusinessProfileRecord({
      ...profile,
      sources: {
        pdfName: req.file?.originalname || "",
        companyWebsite: companyWebsite || "",
        portfolioWebsite: portfolioWebsite || "",
      },
    });

    res.json({
      success: true,
      profile: savedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
