import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req, res) {
  console.log("send from route")
 
  const { files } = req.body; 

  if (!files || !Array.isArray(files)) {
    return res.status(400).json({ error: 'Invalid input: files must be an array' });
  }
    
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prepare prompt
    const prompt = `
      You are a data analyst assistant. Based on the following list of JSON reports, identify trends.
      For each report, summarize whether there is an increase or decrease in key metrics, give a short description, and include an emoji.

      Respond in this format:
      [
        {
          "direction": "increase" or "decrease",
          "description": "short explanation",
          "emoji": "📈 or 📉 or other"
        }
      ]

      Here are the reports:
      ${JSON.stringify(files, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to extract valid JSON from model response
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    const analysis = JSON.parse(jsonString);

    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error analyzing reports:', error);
    return res.status(500).json({ error: 'Failed to analyze reports' });
  }
}
    
    
    
  
}    

