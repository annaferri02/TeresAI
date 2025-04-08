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
      
      You are a meticulous data analysis assistant. Your task is to analyze a series of reports provided in JSON format and identify trends in the occurrence of specific word categories over time.

      **Workflow:**

      1.  **Identify Report Types:** First, carefully examine each report and categorize it as one of the following: "conversation transcript", "mental health report", or "physical examination".

      2.  **Sort by Date:** For each category of report, read the date at the beginning of each document and arrange them chronologically from oldest to newest.

      3.  **Analyze the Latest Two:** For each report category, focus specifically on the **second to last** report and the **very latest** report.

      4.  **Word Counting:** For the two conversation transcript reports, count the occurrences of words related to the following themes:
          * **Pain:** (e.g., pain, ache, sore, discomfort, hurting)
          * **Mood:** (e.g., happy, sad, anxious, calm, joyful, depressed)
          * **Medication:** (e.g., medicine, drug, tablet, capsule, dose, prescription)
          * **Nutrition:** (e.g., food, eat, diet, meal, hungry, thirsty)
          * **Sleep:** (e.g., sleep, tired, rested, insomnia, nap, awake)

      4.1.  **Trend Calculation:** Compare the word counts for each theme between the second to last and the latest report within each category. Calculate the percentage increase or decrease. For example:
          * If "pain" words went from 5 in the second to last report to 10 in the latest, that's a 100% increase.
          * If "sleep" words went from 8 to 6, that's a 25% decrease.
      
      5. **DIRECT ANALYSIS:** For the Mental Health Report and the Physical examination, you should display the trends more directly. Do not do word counting, like you do for the conversation transcripts, instead note what the psychologist or the physiotherapist noted in their report compared to their previous report.

      6.  **JSON Output:** You MUST respond with ONLY a valid JSON array containing objects with the following exact fields for each identified trend:
          * \`"report_type"\`: (e.g., "CONVERSATION TRANSCRIPT", "MENTAL HEALTH REPORT", "PHYSICAL EXAMINATION")
          * \`"theme"\`: (e.g., "pain", "mood", "medication", "nutrition", "sleep")
          * \`"direction"\`: ("increase" or "decrease")
          * \`"percentage_change"\`: (the calculated percentage as a number, e.g., 36)
          * \`"description"\`: A short, informative description of the trend (e.g., "Pain-related words show an increase of 36% from the last report, please inquire with the patient.")
          * \`"emoji"\`: A relevant emoji (e.g., "🤕" for pain, "😊" for mood, "💊" for medication, "🍎" for nutrition, "😴" for sleep).

      7.  **Trend Limits:** Generate **four** trends for "conversation transcripts", **two** trends for "mental health reports", and **two** trends for "physical examinations" (total of no more than 8 trends).

      8. **Trend suggestions:** After stating percentage increase or decrease for the conversation transcript trends. Try to include one sentence in the description that suggest to the nurse to pay closer attention or apply special treatment to the patient, related to the percentage development.
      

      9.  **Temporal Order:** Ensure your analysis always compares the **second most recent** report to the **most recent** report within each category.

      10. **Concise:** Do not write too much for these trends, as they should be easily readable, never write more than 25 words per trend.

      **Example of valid response format:**
      \`\`\`json
      [
        {
          "report_type": "CONVERSATION TRANSCRIPT",
          "theme": "pain",
          "direction": "increase",
          "percentage_change": 36,
          "description": "CONVERSATION REPORT: Pain-related words show an increase of 36% from the last report, please check with the patient for potential wounds or injuries.",
          "emoji": "🤕"
        },
        {
          "report_type": "MENTAL HEALTH REPORT",
          "theme": "mood",
          "direction": "decrease",
          "percentage_change": 15,
          "description": "MENTAL HEALTH REPORT: Words related to mood have decreased by 15% since the previous mental health report.",
          "emoji": "😞"
        }
      ]
      \`\`\`

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