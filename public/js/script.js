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


// Display a custom toast message with gradient styles
function showCustomToast(message, type) {
  let backgroundColor;
  switch (type) {
      case "success":
          backgroundColor = "linear-gradient(to right, #64b14f, #41a62a)";
          break;
      case "warning":
          backgroundColor = "linear-gradient(to right, rgba(255, 152, 0, 0.7), #e57a00)";
          break;
      case "info":
          backgroundColor = "linear-gradient(to right, #0099f7, #005bea)";
          break;
      case "error":
          backgroundColor = "linear-gradient(to right, #ff6b6b, #e53935)";
          break;
      default:
          backgroundColor = "linear-gradient(to right, #64b14f, #41a62a)";
  }


  Toastify({
      text: message,
      duration: 5000, // Duration in milliseconds
      newWindow: true,
      close: true,
      gravity: "bottom", // Display position
      position: "right", 
      backgroundColor: backgroundColor, // Apply custom gradient background
      style: {
        borderRadius: "10px",
        fontSize: "15px",
      },
      stopOnFocus: true,
  }).showToast();
}