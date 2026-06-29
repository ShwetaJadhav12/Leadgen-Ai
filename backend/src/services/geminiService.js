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

async function extractBusinessProfile(sourceText) {
  const prompt = `
You are an AI business profile extraction assistant for an outreach platform.

Analyze the provided PDF text, company website text, and portfolio website text.
Extract a business profile that can be used to generate personalized outreach.

Return ONLY valid JSON with this exact shape:

{
  "business": {
    "name": "",
    "type": "",
    "industry": "",
    "website": "",
    "linkedin": "",
    "location": "",
    "description": "",
    "mission": "",
    "companySize": "",
    "usp": ""
  },
  "services": [
    {
      "name": "",
      "description": ""
    }
  ],
  "targeting": {
    "industries": [],
    "companySizes": [],
    "decisionMakers": []
  },
  "problems": [
    {
      "problem": "",
      "solution": ""
    }
  ],
  "portfolio": [
    {
      "name": "",
      "description": "",
      "technologies": ""
    }
  ]
}

Rules:
- Use empty strings or empty arrays when information is missing.
- Infer likely services, problems solved, and target buyers only when clearly supported by the source.
- Keep descriptions concise and useful for sales outreach.
- Choose business.type from Freelancer, Agency, Startup, SaaS, Consultant, Sales Team, Marketing Agency, Other when possible.
- Choose companySize from Just Me, 2-10, 11-50, 51-200, 200+ when possible.

Source content:

${sourceText}
`;

  const result = await model.generateContent(prompt);

  let response = result.response.text();

  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse Gemini response:", response);
    throw new Error("Gemini returned invalid business profile JSON.");
  }
}

module.exports = {
  extractLeadInfo,
  extractBusinessProfile,
};
