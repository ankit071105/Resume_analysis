// script.js

document.getElementById('resumeForm').onsubmit = async function (e) {
    e.preventDefault();

    const resumeFile = document.getElementById('resumeFile').files[0];
    if (resumeFile) {
        const reader = new FileReader();

        reader.onload = async function(event) {
            const resumeText = event.target.result;

            // Call AI detection API with the extracted text
            const aiPercentage = await detectAIContent(resumeText);

            document.getElementById('result').textContent = `AI Detection: ${aiPercentage}% likely generated with AI.`;
        };

        reader.readAsText(resumeFile);  // For simplicity, assume text-based resume (like .txt, .docx).
    } else {
        alert("Please upload a resume.");
    }
};

async function detectAIContent(text) {
    try {
        const response = await fetch('https://api.your-ai-detection-service.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY_HERE'
            },
            body: JSON.stringify({ content: text })
        });

        const result = await response.json();
        return result.ai_percentage;  // Assume the API returns a percentage in the 'ai_percentage' field
    } catch (error) {
        console.error('Error detecting AI content:', error);
        return 0;  // Fallback to 0% if there's an error
    }
}
