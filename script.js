const API_KEY = "AIzaSyAl1PU_L3QUQgCICRq584Dz-9wC05YL7dY";

async function generateContent() {
    const input = document.getElementById("userInput").value;
    const output = document.getElementById("output");

    if (!input) {
        output.innerText = "Please enter something!";
        return;
    }

    try {
        output.innerText = "Loading...";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: input }]
                    }]
                })
            }
        );

        const data = await response.json();
        const result = data.candidates[0].content.parts[0].text;

        output.innerText = result;

    } catch (error) {
        output.innerText = "Error occurred!";
        console.error(error);
    }
}
