const API_KEY = "AIzaSyAl1PU_L3QUQgCICRq584Dz-9wC05YL7dY";

async function getAffirmation() {
    const output = document.getElementById("affirmationOutput");

    try {
        output.innerText = "Loading...";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: "Give me a short positive affirmation" }]
                    }]
                })
            }
        );

        const data = await response.json();
        const affirmation = data.candidates[0].content.parts[0].text;

        output.innerText = affirmation;

    } catch (error) {
        output.innerText = "Error getting affirmation!";
        console.error(error);
    }
}