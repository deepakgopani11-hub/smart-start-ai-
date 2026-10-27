/**
 * SmartStart AI - Client Interactivity
 * Written with clean, beginner-friendly JavaScript.
 * Every section is commented to explain how it works!
 */

// Wait until the HTML document has fully loaded before running any script
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------
     1. MOBILE NAVIGATION MENU TOGGLE
     When someone visits on a smartphone, clicking the hamburger icon
     opens or closes the navigation dropdown.
  ------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    // When the hamburger button is clicked:
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    // When any link inside the menu is clicked, close the menu automatically:
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  /* -------------------------------------------------------------
     2. CONTACT FORM SUBMISSION HANDLER
     Instead of needing an expensive backend server or paid API,
     we safely handle the form right in the browser!
  ------------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  const feedbackBox = document.getElementById("form-feedback");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm && feedbackBox) {
    contactForm.addEventListener("submit", (event) => {
      // Prevent the browser from refreshing the page
      event.preventDefault();

      // Read values from the input fields
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic friendly check: Make sure required fields are filled
      if (!name || !email || !message) {
        alert("Please fill in your name, email, and message so we can get in touch!");
        return;
      }

      // Simulate a quick sending state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show the success banner
        feedbackBox.style.display = "block";
        feedbackBox.textContent = `🎉 Thank you, ${name}! Your sample message has been received. In a live system, our team will reply to ${email} within 24 hours.`;

        // Reset the form fields back to blank
        contactForm.reset();

        // Restore button state
        submitBtn.textContent = "Send Another Message";
        submitBtn.disabled = false;
      }, 600);
    });
  }
});
