import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  console.log("send from route");
  
  const body = await req.json();
  const { files } = body;
  
  if (!files || !Array.isArray(files)) {
    return new Response(
      JSON.stringify({ error: 'Invalid input: files must be an array' }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  try {
    // Use gemini-2.0-flash as specified
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Prepare prompt with stronger JSON formatting guidance
    const prompt = `
      
      You are a data analyst assistant. Based on the following list of JSON reports, identify trends.
      For each report, summarize whether there is an increase or decrease in key metrics, give a short description, and include an emoji.
      By this, I mean you should count the words related to these themes: pain, mood, medication, nutrition, and sleep. 
      Please report on the increase or decrease of word occurence in percentage by comparing between the reports (e.g. There was a 40% increase in sleep related words, please inquire on his sleep quality).
      Please dedicate one printing line for each of these themes. 
      Also, please conduct these analyses seperately these 3 forms for scripts: 1) conversation transcript 2) mental health report 3)phyiscal examination.
      This means that the trends should only be generated from comparing conversation transcript with the other conversation transcript,
      mental health report with mental health report, physical exam with physical exam.
      
      * IMPORTANT: Please include 4 trends for the conversation transcripts, 2 for the mental health reports and 2 for the physical exam. Therefore no more than 8 trends in total
      Also, Always start each trend with a label for from what report it originated, e.g.: CONVERSATION TRANSCRIPT: ... , MENTAL HEALTH REPORT: ... , PHYSICAL EXAMINATION: ... *
      

      *** VERY IMPORTANT: You MUST respond with ONLY a valid JSON array containing objects with these exact fields: "direction", "description", and "emoji". No explanations, no other text. ***

      ***** MOST IMPORTANT: ALWAYS read the date at the beginning of each file. This trend analysis should keep its temporal order.
      That means that you always analyse the development from the second most recent file to the most recent file.
      E.g.: Morning conversation today had 6 pain related words, Evening conversation today had 10 related words = increase in pain related words trend generated.*****

      Example of valid response format:
      [
        {
          "direction": "increase",
          "description": "Short description of trend",
          "emoji": "🛌" 
        },
        {
          "direction": "decrease",
          "description": "Another trend description",
          "emoji": "💊"
        }
      ]

      For the "emoji" field, choose a relevant emoji that represents the theme (like 😴 for sleep, 💊 for medication, 😊 for mood, etc.). Make sure to include the emoji directly as a string value in the JSON without any special formatting or comments.
      
      Here are the reports:
      ${JSON.stringify(files, null, 2)}
    `;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log("Raw AI response:", text); // Log the full response for debugging
    
    // More robust JSON extraction
    let analysis;
    try {
      // First attempt: try to parse the whole response as JSON
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.log("Initial parse failed, trying to extract JSON...");
      
      // Second attempt: look for JSON array in the text
      const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        try {
          analysis = JSON.parse(jsonMatch[0]);
        } catch (extractError) {
          console.error("JSON extraction failed:", extractError);
          
          // Fallback: Create simple placeholder data
          analysis = [
            { direction: "neutral", description: "Unable to analyze trends", emoji: "⚠️" }
          ];
        }
      } else {
        // If no JSON found, create placeholder
        analysis = [
          { direction: "neutral", description: "Unable to analyze trends", emoji: "⚠️" }
        ];
      }
    }
    
    // Ensure analysis is an array
    if (!Array.isArray(analysis)) {
      analysis = [
        { direction: "neutral", description: "Invalid trend format", emoji: "⚠️" }
      ];
    }
    
    return new Response(
      JSON.stringify({ results: analysis }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error analyzing reports:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze reports', 
        message: error.message,
        results: [{ direction: "neutral", description: "Error processing trends", emoji: "⚠️" }]
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}