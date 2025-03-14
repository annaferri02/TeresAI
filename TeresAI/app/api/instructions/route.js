import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function GET(req, res) {
  try {
    // Read Zorgdoelen.txt from the filesystem
    const filePath = path.join(process.cwd(), "public", "Zorgdoelen.txt");
    const data = fs.readFileSync(filePath, "utf8");
    console.log(data);
    // Initialize the AI model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use environment variable for API key
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate summary
    const prompt = `
    Based on the following patient dossier, generate concise notes for the nurse who is taking care of this patient at the nursing home. 
    The notes should provide important information and observations about each zorgdoel (care goal), focusing on aspects that are helpful for the nurse to be aware of. 
    The goal is to provide useful, actionable insights without creating detailed instructions.

    Ensure the notes are:
    - Relevant to the patient’s current status, preferences, and condition (as mentioned in the dossier)
    - Focused on things that are important for the nurse to know when caring for the patient
    - Concise, practical, and easy to understand

    The dossier is as follows:

    ${data}

    Extract the zorgdoelen (care goals) from the dossier and provide brief, practical notes for the nurse, highlighting key details that will help them in patient care. 
    These notes should include things like progress updates, preferences, limitations, and anything else the nurse should be aware of to provide optimal care.

    Please keep the notes concise and focused on the most important details for the nurse to know.
    The output should be structured as follows:
    1. (Zorgdoel): anything that is important for the nurse to consider.
    2. (Zorgdoel): anything that is important for the nurse to consider.
    ...
    Please provide your answer in Dutch.
`;

    const result = await model.generateContent(prompt);
    // const responseText = result.response.text(); // Extract text output
    const responseText = "Generated Instructions dfjakfldajkfjdsakl;fjdaskj;lfjdkjasl;fjdklsa;jfdklas;fjdklas;fd"
    console.log(responseText);
    res.status(200).json({ instructions: responseText });
    
  } catch (error) {
    console.error("Error generating instructions:", error);
    res.status(500).json({ error: "Failed to generate instructions" });
  }
}
