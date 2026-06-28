const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function extractLeadInfo(pdfText) {
  const prompt = `
You are an AI Sales Intelligence Assistant.

Analyze the following LinkedIn profile and extract structured information.

Calculate a Lead Score (0-100) based on:
- Seniority
- Decision-making authority
- Leadership experience
- Company reputation
- Years of experience
- Technical expertise
- Hiring potential

Return ONLY valid JSON.

{
  "name":"",
  "role":"",
  "company":"",
  "industry":"",
  "location":"",
  "summary":"",
  "skills":[],
  "education":[],
  "experience":[],
  "score":0,
  "insights":[]
}

LinkedIn Profile:

${pdfText}
`;

  const result = await model.generateContent(prompt);

  let response = result.response.text();

  // Remove markdown formatting if Gemini returns it
  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse Gemini response:", response);
    throw new Error("Gemini returned invalid JSON.");
  }
}

module.exports = {
  extractLeadInfo,
};