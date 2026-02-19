const API_KEY = "AIzaSyAl1PU_L3QUQgCICRq584Dz-9wC05YL7dY";

async function generateQuiz() {
    const topic = document.getElementById("topic").value;
    const output = document.getElementById("quizOutput");

    if (!topic) {
        output.innerText = "Enter a topic!";
        return;
    }

    try {
        output.innerText = "Loading...";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `Generate one quiz question about ${topic}` }]
                    }]
                })
            }
        );

        const data = await response.json();
         const question = data.candidates[0].content.parts[0].text;

        output.innerText = question;

    } catch (error) {
        output.innerText = "Error generating question!";
        console.error(error);
    }
}