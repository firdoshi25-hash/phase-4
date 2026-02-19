const API_KEY = "AIzaSyAl1PU_L3QUQgCICRq584Dz-9wC05YL7dY";

async function getJoke() {
    const output = document.getElementById("jokeOutput");

    try {
        output.innerText = "Loading...";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: "Tell me a short funny joke." }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error?.message);
        }

        const joke = data.candidates?.[0]?.content?.parts?.[0]?.text;

        output.innerText = joke || "No joke received.";

    } catch (error) {
        console.error(error);
        output.innerText = "Error getting joke!";
    }
}