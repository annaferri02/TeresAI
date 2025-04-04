import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const requestData = await request.json();
    const files = requestData.files; // Array of JSON files
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create a single comprehensive prompt for all file types
    const prompt = `
      Analyze these patient health records and provide clinical insights based on chronological trends.
      
      INSTRUCTIONS:
      1. First, identify the date (DD/MM/YYYY) and time of day (morning/evening) within each document.
      2. Order the documents chronologically.
      3. For conversations, analyze occurrences of words related to these themes:
         family, loneliness, pain, medication, sleep, mood, anxiety, physical activity, appetite
      4. For clinical reports (mental health or physical therapy), identify the key metrics or assessments.
      5. Track changes over time for each significant theme or metric.
      6. For each meaningful trend, provide an analysis in dictionary format which adheres to this thematic grouping:
         - theme: The theme or metric name (e.g., "pain", "depression", "mobility")
         - direction: Either "increase" or "decrease"
         - description: A sentence stating the percentage or qualitative change
         - emoji: A single emoji that represents the clinical significance of this trend

      FORMAT EXAMPLE:
      {
        "results": [
          {
            "theme": "pain",
            "direction": "increase",
            "description": "40% increase in pain-related words over the past two days",
            "emoji": "😖"
          },
          {
            "theme": "anxiety",
            "direction": "decrease",
            "description": "Substantial reduction in anxiety markers since last assessment",
            "emoji": "😌"
          },
          {
            "theme": "mobility",
            "direction": "increase",
            "description": "Significant improvement in functional mobility",
            "emoji": "🚶"
          }
        ]
      }
      
      NOTES:
      - Focus on chronological changes rather than file types
      - Choose emojis that represent clinical significance (positive or negative)
      - Only include themes with meaningful changes
      - For percentage changes, use the most recent document as reference point
      
      DOCUMENTS:
      ${JSON.stringify(files)}
    `;
    
    // Process data with Gemini
    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();
    
    try {
      // Parse the JSON response from Gemini
      const parsedResponse = JSON.parse(rawResponse);
      
      // Enhance the results with arrows and colors
      const enhancedResults = parsedResponse.results.map(item => {
        const theme = item.theme.toLowerCase();
        const direction = item.direction.toLowerCase();
        return {
          ...item,
          arrow: direction === "increase" ? "▲" : "▼",
          color: getThemeColor(theme, direction)
        };
      });
      
      return new Response(
        JSON.stringify({
          summary: "Chronological health trends analysis",
          results: enhancedResults
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
  } catch (error) {
    console.error('Error processing with Gemini:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Helper function to determine color based on theme and direction
function getThemeColor(theme, direction) {
  // Positive themes (where increase is good)
  const positiveThemes = [
    "family", "sleep", "mood", "physical activity", 
    "mobility", "strength", "social functioning", "range of motion",
    "cognitive function", "treatment compliance"
  ];
  
  // Negative themes (where increase is concerning)
  const negativeThemes = [
    "loneliness", "pain", "medication", "anxiety", "depression", 
    "stress", "risk", "fatigue", "weight loss", "inflammation"
  ];
  
  // Determine if theme is positive or negative
  let isPositiveTheme = false;
  
  if (positiveThemes.some(pt => theme.includes(pt))) {
    isPositiveTheme = true;
  } else if (negativeThemes.some(nt => theme.includes(nt))) {
    isPositiveTheme = false;
  } else {
    // Default for unknown themes - assume increase is positive
    isPositiveTheme = true;
  }
  
  const isIncrease = direction === 'increase';
  
  // Determine color based on theme type and direction
  if ((isPositiveTheme && isIncrease) || (!isPositiveTheme && !isIncrease)) {
    return "green"; // Positive clinical outcome
  } else {
    return "red";   // Negative clinical outcome
  }
}