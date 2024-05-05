// Add custom JavaScript here
function userScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // navbar.classList.add("bg-dark");
      navbar.classList.add("navbar-sticky");
    } else {
      // navbar.classList.remove("bg-dark");
      navbar.classList.remove("navbar-sticky");
    }
  });
}

document.addEventListener("DOMContentLoaded", userScroll);

// Animate Text-----------------

var words = ["resume", "CV"]; // Array of words to cycle through
var index = 0; // Index to keep track of the current word
var spanElement = document.getElementById("animatedText");
var text = words[index];
var timeout;

// Function to animate the text
function animateText() {
  spanElement.textContent = text.slice(0, spanElement.textContent.length + 1);
  if (spanElement.textContent === text) {
    clearTimeout(timeout);
    timeout = setTimeout(cleanText, 10000);
  } else {
    setTimeout(animateText, 250);
  }
}

// Function to clean the text
function cleanText() {
  spanElement.textContent = text.slice(0, spanElement.textContent.length - 1);
  if (spanElement.textContent === "") {
    clearTimeout(timeout);
    index = (index + 1) % words.length; // Move to the next word or loop back to the beginning
    text = words[index];
    timeout = setTimeout(animateText, 700);
  } else {
    timeout = setTimeout(cleanText, 250);
  }
}

// Call the function initially
animateText();

//Phone number flag
$("input").intlTelInput({
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js",
});
