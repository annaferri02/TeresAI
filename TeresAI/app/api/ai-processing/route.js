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
      
      // Themes to analyze
      const conversationThemes = [
        "family", "loneliness", "pain", "medication", "sleep", 
        "mood", "anxiety", "physical activity", "appetite"
      ];
      
      // Create prompt for conversation analysis with the expected output format
      const prompt = `
        Analyze these patient conversation transcripts and provide clinical insights.
        
        INSTRUCTIONS:
        1. Count occurrences of words related to key themes: ${conversationThemes.join(', ')}
        2. Compare frequencies across time periods
        3. Calculate percentage changes relative to the latest transcript
        4. For each theme with a meaningful change (>10%), provide an analysis in JSON format
        5. For each theme, output the following fields:
           - theme: The theme name (e.g., "family", "pain")
           - direction: Either "increase" or "decrease"
           - description: A sentence stating the percentage change (e.g., "30% increase in family-related words")
           - emoji: A single emoji that represents the clinical significance of this trend
        
        FORMAT EXAMPLE:
        {
          "results": [
            {
              "theme": "pain",
              "direction": "increase",
              "description": "40% increase in pain-related words compared to yesterday",
              "emoji": "😖"
            },
            {
              "theme": "family",
              "direction": "decrease",
              "description": "25% decrease in family-related words over the past two days",
              "emoji": "😔"
            }
          ]
        }
        
        NOTES:
        - Choose emojis that represent clinical significance (positive or negative)
        - Only include themes with meaningful changes
        - Make description concise but informative
        
        TRANSCRIPTS:
        ${JSON.stringify(fileContents)}
      `;
      
      const result = await model.generateContent(prompt);
      const rawResponse = result.response.text();
      
      try {
        // Parse the JSON response from Gemini
        const parsedResponse = JSON.parse(rawResponse);
        
        // Add arrow visualization
        const results = parsedResponse.results.map(item => {
          return {
            ...item,
            arrow: item.direction === "increase" ? "▲" : "▼",
            color: getThemeColor(item.theme, item.direction)
          };
        });
        
        return new Response(
          JSON.stringify({
            summary: "Patient conversation analysis with trends",
            results: results
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        // If there's an issue parsing the JSON, return the raw response for debugging
        console.error("Error parsing Gemini response:", error);
        return new Response(
          JSON.stringify({ 
            error: "Could not parse Gemini response", 
            rawResponse: rawResponse 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
    } else if (fileType === 'mentalhealth') {
      // Mental health report analysis
      fileContents = {
        current: await readJSONFile('mentalhealthreport2.json'),
        previous: await readJSONFile('mentalhealthreport1.json')
      };
      
      const prompt = `
        Compare these two mental health assessment reports and provide clinical insights.
        
        INSTRUCTIONS:
        1. Identify significant changes in mental health status
        2. For each important clinical factor with meaningful change, provide analysis in JSON format
        3. For each factor, output the following fields:
           - theme: The factor name (e.g., "depression", "anxiety")
           - direction: Either "increase" or "decrease"
           - description: A sentence stating the change (e.g., "Significant increase in depressive symptoms")
           - emoji: A single emoji that represents the clinical significance
        
        FORMAT EXAMPLE:
        {
          "results": [
            {
              "theme": "anxiety",
              "direction": "decrease",
              "description": "Substantial decrease in anxiety symptoms since last assessment",
              "emoji": "😌"
            },
            {
              "theme": "social functioning",
              "direction": "increase",
              "description": "Marked improvement in social engagement and relationship quality",
              "emoji": "👍"
            }
          ]
        }
        
        NOTES:
        - Choose emojis that represent clinical significance
        - Only include factors with meaningful changes
        
        REPORTS:
        ${JSON.stringify(fileContents)}
      `;
      
      const result = await model.generateContent(prompt);
      const rawResponse = result.response.text();
      
      try {
        // Parse the JSON response from Gemini
        const parsedResponse = JSON.parse(rawResponse);
        
        // Add arrow visualization
        const results = parsedResponse.results.map(item => {
          return {
            ...item,
            arrow: item.direction === "increase" ? "▲" : "▼",
            color: getMentalHealthColor(item.theme, item.direction)
          };
        });
        
        return new Response(
          JSON.stringify({
            summary: "Mental health assessment trends",
            results: results
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error("Error parsing Gemini response:", error);
        return new Response(
          JSON.stringify({ 
            error: "Could not parse Gemini response", 
            rawResponse: rawResponse 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
    } else if (fileType === 'physio') {
      // Physiotherapy report analysis
      fileContents = {
        current: await readJSONFile('physioreport2.json'),
        previous: await readJSONFile('physioreport1.json')
      };
      
      const prompt = `
        Compare these two physiotherapy assessment reports and provide clinical insights.
        
        INSTRUCTIONS:
        1. Identify significant changes in physical function and mobility
        2. For each important clinical factor with meaningful change, provide analysis in JSON format
        3. For each factor, output the following fields:
           - theme: The factor name (e.g., "pain levels", "mobility")
           - direction: Either "increase" or "decrease"
           - description: A sentence stating the change (e.g., "30% reduction in reported pain levels")
           - emoji: A single emoji that represents the clinical significance
        
        FORMAT EXAMPLE:
        {
          "results": [
            {
              "theme": "range of motion",
              "direction": "increase",
              "description": "Significant improvement in shoulder range of motion since last assessment",
              "emoji": "💪"
            },
            {
              "theme": "pain levels",
              "direction": "decrease",
              "description": "30% reduction in reported pain intensity during activity",
              "emoji": "😌"
            }
          ]
        }
        
        NOTES:
        - Choose emojis that represent clinical significance
        - Only include factors with meaningful changes
        
        REPORTS:
        ${JSON.stringify(fileContents)}
      `;
      
      const result = await model.generateContent(prompt);
      const rawResponse = result.response.text();
      
      try {
        // Parse the JSON response from Gemini
        const parsedResponse = JSON.parse(rawResponse);
        
        // Add arrow visualization
        const results = parsedResponse.results.map(item => {
          return {
            ...item,
            arrow: item.direction === "increase" ? "▲" : "▼",
            color: getPhysioColor(item.theme, item.direction)
          };
        });
        
        return new Response(
          JSON.stringify({
            summary: "Physiotherapy assessment trends",
            results: results
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error("Error parsing Gemini response:", error);
        return new Response(
          JSON.stringify({ 
            error: "Could not parse Gemini response", 
            rawResponse: rawResponse 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      throw new Error("Invalid file type specified");
    }
    
  } catch (error) {
    console.error('Error processing with Gemini:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Helper functions for color determination
function getThemeColor(theme, direction) {
  const positiveThemes = ["family", "sleep", "mood", "physical activity"];
  const isPositiveTheme = positiveThemes.includes(theme.toLowerCase());
  const isIncrease = direction.toLowerCase() === 'increase';
  
  // Positive themes: increase is green, decrease is red
  // Negative themes: increase is red, decrease is green
  if ((isPositiveTheme && isIncrease) || (!isPositiveTheme && !isIncrease)) {
    return "green";
  } else {
    return "red";
  }
}

function getMentalHealthColor(theme, direction) {
  const negativeFactors = ["depression", "anxiety", "stress", "risk"];
  
  // Check if this is a negative factor
  const isNegativeFactor = negativeFactors.some(factor => 
    theme.toLowerCase().includes(factor)
  );
  
  const isIncrease = direction.toLowerCase() === 'increase';
  
  // For negative factors: increase is red, decrease is green
  // For positive factors: increase is green, decrease is red
  if ((isNegativeFactor && isIncrease) || (!isNegativeFactor && !isIncrease)) {
    return "red";
  } else {
    return "green";
  }
}

function getPhysioColor(theme, direction) {
  const isNegativeFactor = theme.toLowerCase().includes('pain');
  const isIncrease = direction.toLowerCase() === 'increase';
  
  // For pain: increase is red, decrease is green
  // For other factors: increase is green, decrease is red
  if ((isNegativeFactor && isIncrease) || (!isNegativeFactor && !isIncrease)) {
    return "red";
  } else {
    return "green";
  }
}