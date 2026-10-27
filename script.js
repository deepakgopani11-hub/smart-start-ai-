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

  /* -------------------------------------------------------------
     3. FLOATING CHATBOT WIDGET (SMARTBOT)
     Handles opening/closing the chat window, user message input,
     bouncing typing animation, and friendly instant answers.
  ------------------------------------------------------------- */
  const chatbotLauncher = document.getElementById("chatbot-launcher");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotForm = document.getElementById("chatbot-form");
  const chatbotInput = document.getElementById("chatbot-input");
  const launcherBadge = document.getElementById("launcher-badge");
  const suggestionChips = document.querySelectorAll(".suggestion-chip");
  const chatOpenIcon = chatbotLauncher ? chatbotLauncher.querySelector(".chat-open-icon") : null;
  const chatCloseIcon = chatbotLauncher ? chatbotLauncher.querySelector(".chat-close-icon") : null;

  // Function to open or close the chatbot
  function toggleChatbot(forceState) {
    if (!chatbotWindow) return;
    
    const isOpen = typeof forceState === "boolean" 
      ? forceState 
      : !chatbotWindow.classList.contains("open");

    if (isOpen) {
      chatbotWindow.classList.add("open");
      chatbotWindow.setAttribute("aria-hidden", "false");
      if (chatOpenIcon) chatOpenIcon.style.display = "none";
      if (chatCloseIcon) chatCloseIcon.style.display = "inline";
      if (launcherBadge) launcherBadge.style.display = "none"; // Hide notification badge once opened
      if (chatbotInput) chatbotInput.focus();
    } else {
      chatbotWindow.classList.remove("open");
      chatbotWindow.setAttribute("aria-hidden", "true");
      if (chatOpenIcon) chatOpenIcon.style.display = "inline";
      if (chatCloseIcon) chatCloseIcon.style.display = "none";
    }
  }

  if (chatbotLauncher) {
    chatbotLauncher.addEventListener("click", () => toggleChatbot());
  }

  if (chatbotCloseBtn) {
    chatbotCloseBtn.addEventListener("click", () => toggleChatbot(false));
  }

  // Helper to get formatted current time (e.g. "3:45 PM")
  function getCurrentTimeString() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Appends a new message bubble to the chat feed
  function appendMessage(sender, text) {
    if (!chatbotMessages) return;

    const messageEl = document.createElement("div");
    messageEl.className = `chat-message ${sender}-message`;

    const bubbleEl = document.createElement("div");
    bubbleEl.className = "chat-bubble";
    bubbleEl.innerHTML = text;

    const timeEl = document.createElement("span");
    timeEl.className = "message-time";
    timeEl.textContent = getCurrentTimeString();

    messageEl.appendChild(bubbleEl);
    messageEl.appendChild(timeEl);
    chatbotMessages.appendChild(messageEl);

    // Smoothly scroll to the bottom of the conversation
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Shows a simulated typing indicator while the bot "thinks"
  function showTypingIndicator() {
    if (!chatbotMessages) return null;
    const indicatorEl = document.createElement("div");
    indicatorEl.className = "chat-message bot-message typing-indicator-message";
    indicatorEl.innerHTML = `
      <div class="chat-bubble">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    chatbotMessages.appendChild(indicatorEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return indicatorEl;
  }

  // Answers questions using SmartStart AI knowledge base
  function getBotResponse(userText) {
    const query = userText.toLowerCase().trim();

    if (query.includes("service") || query.includes("offer") || query.includes("what do you do")) {
      return "We offer 3 core AI services tailored for beginners:<br>• <strong>⚡ Workflow Automation</strong><br>• <strong>💬 Smart Customer Chatbots</strong><br>• <strong>✍️ AI Content & Marketing</strong><br>Which one would you like to explore?";
    }
    if (query.includes("price") || query.includes("cost") || query.includes("rate") || query.includes("how much")) {
      return "Our initial AI discovery consultation is <strong>100% free</strong>! Custom implementation packages are designed to be accessible for small business budgets. Feel free to submit our contact form for a personalized estimate.";
    }
    if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("reach") || query.includes("call")) {
      return "You can reach our friendly team anytime at <strong>hello@smartstartai.example.com</strong> or call <strong>+1 (555) 019-2834</strong>. You can also leave a message in the contact section below!";
    }
    if (query.includes("automation") || query.includes("workflow") || query.includes("invoice")) {
      return "Our <strong>Workflow Automation</strong> connects your daily tools (email, spreadsheets, invoices) so repetitive chores run automatically, saving you up to 15 hours each week!";
    }
    if (query.includes("chatbot") || query.includes("chat bot") || query.includes("bot")) {
      return "You are interacting with one right now! We build custom 24/7 chatbots trained on your company's unique information to instantly answer customer questions and capture leads.";
    }
    if (query.includes("content") || query.includes("marketing") || query.includes("write")) {
      return "Our <strong>AI Content & Marketing</strong> service sets up tailored templates that write high-converting social media posts, blog drafts, and client emails matching your exact brand voice.";
    }
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hello! How can I help you discover how AI can simplify your business today?";
    }

    // Default friendly answer
    return "That's a great question! SmartStart AI helps businesses simplify tasks with artificial intelligence. Ask me about our <strong>services</strong>, <strong>pricing</strong>, or how to <strong>contact</strong> our team!";
  }

  // Handles sending a user message and triggering the bot reply
  function handleSendMessage(messageText) {
    if (!messageText || !messageText.trim()) return;

    // 1. Display user message
    appendMessage("user", messageText);

    // 2. Clear input
    if (chatbotInput) chatbotInput.value = "";

    // 3. Show typing animation
    const typingIndicator = showTypingIndicator();

    // 4. Calculate answer with realistic slight delay
    setTimeout(() => {
      if (typingIndicator && typingIndicator.parentNode) {
        typingIndicator.remove();
      }
      const reply = getBotResponse(messageText);
      appendMessage("bot", reply);
    }, 700);
  }

  // Form submit listener
  if (chatbotForm && chatbotInput) {
    chatbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSendMessage(chatbotInput.value);
    });
  }

  // Suggestion chips listeners
  suggestionChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const question = chip.getAttribute("data-question") || chip.textContent;
      handleSendMessage(question);
    });
  });
});

