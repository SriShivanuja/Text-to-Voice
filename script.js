let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Load voices when they change or initialize them immediately
const initVoices = () => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        alert("No voices available for speech synthesis.");
        return;
    }

    // Set default voice
    speech.voice = voices[0];

    // Populate voice dropdown
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

// Event listener for voice changes
window.speechSynthesis.onvoiceschanged = initVoices;
initVoices();

// Update the selected voice
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Speak the text from the textarea
document.querySelector("button").addEventListener("click", () => {
    const inputText = document.querySelector("textarea").value.trim();

    if (!inputText) {
        alert("Please enter some text before listening!");
        return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Set the text and start speaking
    speech.text = inputText;
    window.speechSynthesis.speak(speech);
});
