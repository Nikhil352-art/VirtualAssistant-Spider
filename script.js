let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

// Greet user based on the time of the day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Hello, Good Morning! How can I help you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Hello, Good Afternoon! How can I help you?");
    } else {
        speak("Hello, Good Evening! How can I help you?");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = false; // Stop after first recognition
recognition.interimResults = false; // Prevent partial results

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    content.innerText = transcript; // Set recognized text
    recognition.stop(); // Stop recognition to prevent continuous activation
    takeCommand(transcript.toLowerCase());
};

// Handle speech recognition errors
recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    speak("Sorry, I couldn't understand that. Please try again.");
    btn.removeAttribute("disabled"); // Re-enable button on error
};

// Start recognition when button is clicked
btn.addEventListener("click", () => {
    btn.setAttribute("disabled", "true"); // Disable button to prevent multiple clicks
    btn.innerText = "Listening...";
    voice.innerText = "🎙️ Listening..."; // Add mic icon

    recognition.start();
});

// Process recognized voice command
function takeCommand(message) {
    btn.removeAttribute("disabled"); // Re-enable button
    btn.innerText = "Start Listening"; // Reset button text
    
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello! What can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, here to help you.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://www.youtube.com");
    } else if (message.includes("open google")) {
        speak("Opening Google.");
        window.open("https://www.google.com");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook.");
        window.open("https://www.facebook.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram.");
        window.open("https://www.instagram.com");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp Web.");
        window.open("https://web.whatsapp.com");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter.");
        window.open("https://twitter.com");
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn.");
        window.open("https://www.linkedin.com");
    } else if (message.includes("open github")) {
        speak("Opening GitHub.");
        window.open("https://github.com");
    } else if (message.includes("open spotify")) {
        speak("Opening Spotify.");
        window.open("https://www.spotify.com");
    } else if (message.includes("open netflix")) {
        speak("Opening Netflix.");
        window.open("https://www.netflix.com");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator is not supported in browsers.");
        alert("Calculator opening is not supported via browser scripts.");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
        speak(`Today's date is ${date}`);
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
