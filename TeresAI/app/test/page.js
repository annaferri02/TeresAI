'use client';
import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testGemini = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/ai-processing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: [
            {
              "type": "conversation",
              "date": "02/04/2025",
              "time": "morning",
              "content": {
                "patient": "I've been feeling more pain in my knee today. It's making it hard to sleep."
              }
            },
            {
              "type": "conversation",
              "date": "01/04/2025",
              "time": "evening",
              "content": {
                "patient": "Had a good day today, spent time with my family. Less anxious than yesterday."
              }
            }
          ]
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding: '20px'}}>
      <h1 style={{marginBottom: '20px'}}>Gemini API Test</h1>
      
      <button 
        onClick={testGemini}
        style={{padding: '10px', backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: '4px'}}
      >
        {loading ? 'Processing...' : 'Test Gemini API'}
      </button>
      
      {result && (
        <div style={{marginTop: '20px'}}>
          <h2>Results:</h2>
          <pre style={{backgroundColor: '#f0f0f0', padding: '10px', overflow: 'auto'}}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}