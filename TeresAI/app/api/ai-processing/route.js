import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const requestData = await request.json();
    const fileType = requestData.fileType; // 'conversation', 'mentalhealth', or 'physio'
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Read different files based on the request type
    let fileContents = {};
    let processedData = "";
    
    // Helper function to read files
    async function readJSONFile(filename) {
      try {
        const response = await fetch(`/api/read-file?filename=${filename}`);
        if (!response.ok) throw new Error(`Failed to read ${filename}`);
        return await response.json();
      } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw error;
      }
    }
    
    // Process based on file type
    if (fileType === 'conversation') {
      // Read all conversation files
      fileContents = {
        latest: await readJSONFile('daybeforeeveningconversation.json'),
        morning: await readJSONFile('daybeforemorningconversation.json'),
        twoDaysBeforeMorning: await readJSONFile('2daysbeforemorningconversation.json'),
        twoDaysBeforeEvening: await readJSONFile('2daysbeforeeveningconversation.json')
      };
      
      // Prepare data analysis for Gemini
      const analysisData = {
        files: fileContents,
        themes: [
          "family", "loneliness", "pain", "medication", "sleep", 
          "mood", "anxiety", "physical activity", "appetite"
        ]
      };
      
      // Create prompt for conversation analysis
      const prompt = `
        Analyze these patient conversation transcripts and provide clinical insights.
        
        INSTRUCTIONS:
        1. Count occurrences of words related to key themes: ${analysisData.themes.join(', ')}
        2. Compare frequencies across time periods
        3. Calculate percentage changes relative to the latest transcript
        4. Identify clinically significant patterns
        5. Provide 3-5 specific, actionable insights (e.g., "40% increase in pain-related vocabulary suggests need for medication review")
        6. Format insights as bulleted list
        7. Focus on changes that require clinical attention
        
        TRANSCRIPTS:
        ${JSON.stringify(analysisData.files)}
      `;
      
      const result = await model.generateContent(prompt);
      processedData = result.response.text();
      
    } else if (fileType === 'mentalhealth') {
      // Read mental health reports
      fileContents = {
        current: await readJSONFile('mentalhealthreport2.json'),
        previous: await readJSONFile('mentalhealthreport1.json')
      };
      
      const prompt = `
        Compare these two mental health assessment reports and provide clinical insights.
        
        INSTRUCTIONS:
        1. Identify significant changes in mental health status
        2. Note changes in assessment scores if present
        3. Highlight emerging or resolving symptoms
        4. Assess changes in risk factors
        5. Provide 3-4 specific clinical recommendations based on observed trends
        6. Format trends and recommendations as separate bulleted lists
        
        REPORTS:
        ${JSON.stringify(fileContents)}
      `;
      
      const result = await model.generateContent(prompt);
      processedData = result.response.text();
      
    } else if (fileType === 'physio') {
      // Read physiotherapy reports
      fileContents = {
        current: await readJSONFile('physioreport2.json'),
        previous: await readJSONFile('physioreport1.json')
      };
      
      const prompt = `
        Compare these two physiotherapy assessment reports and provide clinical insights.
        
        INSTRUCTIONS:
        1. Identify significant changes in physical function and mobility
        2. Note changes in pain levels and locations
        3. Assess progress in rehabilitation goals
        4. Evaluate effectiveness of current treatment plan
        5. Provide 3-4 specific recommendations for treatment adjustments
        6. Format trends and recommendations as separate bulleted lists
        
        REPORTS:
        ${JSON.stringify(fileContents)}
      `;
      
      const result = await model.generateContent(prompt);
      processedData = result.response.text();
    } else {
      throw new Error("Invalid file type specified");
    }
    
    return new Response(
      JSON.stringify({ 
        result: processedData,
        type: fileType 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error processing with Gemini:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}