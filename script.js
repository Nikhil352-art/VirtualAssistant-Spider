let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours(); 
    if (hours >= 0 && hours < 12) {
        speak("Hello Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Hello Good Afternoon");
    } else {
        speak("Hello Good Evening");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript; 
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none"; 
    voice.style.display = "block"; 
});
function takeCommand(message) { 
    btn.style.display = "flex"; 
    voice.style.display = "none"; 
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter");
        window.open("https://twitter.com");
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com");
    } else if (message.includes("open github")) {
        speak("Opening GitHub");
        window.open("https://github.com");
    } else if (message.includes("open spotify")) {
        speak("Opening Spotify");
        window.open("https://www.spotify.com");
    } else if (message.includes("open netflix")) {
        speak("Opening Netflix");
        window.open("https://www.netflix.com");
    } else if (message.includes("open calculator")) { 
        speak("Opening calculator");
        alert("Opening calculator functionality is not supported via a protocol in browsers.");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" }); 
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
        speak(`Today's date is ${date}`);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("spider", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("spider", "")}`, "_blank");
    }
}
