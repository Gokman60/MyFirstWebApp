const form = document.getElementById("contact-form");
const fullName = document.getElementById("full-name");
const message = document.getElementById("message");
const characterCount = document.getElementById("character-count");
const formStatus = document.getElementById("form-status");
const resetButton = document.querySelector(".reset-button");
const toggleLearningButton = document.getElementById("toggle-learning");
const extraLearning = document.getElementById("extra-learning");
const jokeButton = document.getElementById("joke-button");
const jokeSetup = document.getElementById("joke-setup");
const jokePunchline = document.getElementById("joke-punchline");

// Update the character counter as the user types
message.addEventListener("input", function () {
    characterCount.textContent = message.value.length;
    formStatus.textContent = "";
    formStatus.classList.remove("success");
});

// Remove a previous custom error when the name is changed
fullName.addEventListener("input", function () {
    fullName.setCustomValidity("");
    formStatus.textContent = "";
    formStatus.classList.remove("success");
});

// Respond when the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = fullName.value.trim();

    // Prevent a name containing only spaces
    if (name.length < 2) {
        fullName.setCustomValidity(
            "Please enter a name containing at least two characters."
        );

        fullName.reportValidity();
        fullName.focus();
        return;
    }

    fullName.setCustomValidity("");

    formStatus.textContent =
        `Thank you, ${name}. Your form has been completed successfully.`;

    formStatus.classList.add("success");

    form.reset();
});

// Reset the character count when the form is cleared
form.addEventListener("reset", function () {
    characterCount.textContent = "0";
});

// Remove the confirmation if the user selects Clear Form
resetButton.addEventListener("click", function () {
    formStatus.textContent = "";
    formStatus.classList.remove("success");
});

// Show or hide the additional learning information
function toggleLearningDetails() {
    const isHidden = extraLearning.hidden;

    extraLearning.hidden = !isHidden;

    toggleLearningButton.textContent = isHidden
        ? "Hide learning details"
        : "Show learning details";

    toggleLearningButton.setAttribute(
        "aria-expanded",
        String(isHidden)
    );
}

toggleLearningButton.addEventListener(
    "click",
    toggleLearningDetails
);
// Retrieve a programming joke from an external API
async function getProgrammingJoke() {
    jokeButton.disabled = true;
    jokeButton.textContent = "Loading...";
    jokeSetup.textContent = "Retrieving a programming joke...";
    jokePunchline.textContent = "";

    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/jokes/programming/random"
        );

        if (!response.ok) {
            throw new Error(
                `The API returned status ${response.status}.`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("The API returned an unexpected response.");
        }

        const joke = data[0];

        jokeSetup.textContent = joke.setup;
        jokePunchline.textContent = joke.punchline;
    } catch (error) {
        console.error("Unable to retrieve joke:", error);

        jokeSetup.textContent =
            "Sorry, a programming joke could not be loaded.";

        jokePunchline.textContent =
            "Please check your connection and try again.";
    } finally {
        jokeButton.disabled = false;
        jokeButton.textContent = "Get Another Programming Joke";
    }
}

jokeButton.addEventListener("click", getProgrammingJoke);
