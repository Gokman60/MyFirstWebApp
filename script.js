const form = document.getElementById("contact-form");
const fullName = document.getElementById("full-name");
const message = document.getElementById("message");
const characterCount = document.getElementById("character-count");
const formStatus = document.getElementById("form-status");
const resetButton = document.querySelector(".reset-button");

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