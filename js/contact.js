/**
 * MIVA OPEN UNIVERSITY - STUDENT PORTFOLIO & ACADEMIC MANAGEMENT
 * Contact Form Validation Module
 * Enforces:
 *  1. No field is empty
 *  2. Email format is valid
 *  3. Phone number contains only digits
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const alertSuccess = document.getElementById('alertSuccess');
  const submitBtn = document.getElementById('contactSubmitBtn');

  // Email regex RFC standard subset
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Phone regex: must contain only digits (between 7 and 15 digits)
  const phoneRegex = /^[0-9]{7,15}$/;

  function validateField(input, condition, errorMessage) {
    const feedbackElem = input.nextElementSibling;
    if (!condition) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (feedbackElem && feedbackElem.classList.contains('invalid-feedback')) {
        feedbackElem.textContent = errorMessage;
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedbackElem && feedbackElem.classList.contains('invalid-feedback')) {
        feedbackElem.textContent = '';
      }
      return true;
    }
  }

  // Real-time validation on input / blur
  nameInput.addEventListener('blur', () => {
    validateField(
      nameInput,
      nameInput.value.trim().length >= 2,
      'Full Name is required (minimum 2 characters).'
    );
  });

  emailInput.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (!val) {
      validateField(emailInput, false, 'Email address is required.');
    } else if (!emailRegex.test(val)) {
      validateField(emailInput, false, 'Please provide a valid email format (e.g., student@miva.edu.ng).');
    } else {
      validateField(emailInput, true, '');
    }
  });

  phoneInput.addEventListener('input', () => {
    // Immediate feedback if non-digit entered
    const val = phoneInput.value.trim();
    if (/[^0-9]/.test(val)) {
      validateField(phoneInput, false, 'Phone number must contain only digits (0-9). No spaces, dashes, or letters.');
    } else if (val.length > 0 && (val.length < 7 || val.length > 15)) {
      validateField(phoneInput, false, 'Phone number must be between 7 and 15 digits.');
    } else if (val.length >= 7) {
      validateField(phoneInput, true, '');
    }
  });

  messageInput.addEventListener('blur', () => {
    validateField(
      messageInput,
      messageInput.value.trim().length >= 10,
      'Message cannot be empty (minimum 10 characters).'
    );
  });

  // Handle Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const messageVal = messageInput.value.trim();

    let isValid = true;

    // 1. Validate Name
    if (!nameVal || nameVal.length < 2) {
      validateField(nameInput, false, 'Please enter your full name.');
      isValid = false;
    } else {
      validateField(nameInput, true, '');
    }

    // 2. Validate Email
    if (!emailVal) {
      validateField(emailInput, false, 'Email address cannot be empty.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      validateField(emailInput, false, 'Please enter a valid email address.');
      isValid = false;
    } else {
      validateField(emailInput, true, '');
    }

    // 3. Validate Phone (only digits)
    if (!phoneVal) {
      validateField(phoneInput, false, 'Phone number cannot be empty.');
      isValid = false;
    } else if (!phoneRegex.test(phoneVal)) {
      validateField(phoneInput, false, 'Phone number must contain only digits (0-9).');
      isValid = false;
    } else {
      validateField(phoneInput, true, '');
    }

    // 4. Validate Message
    if (!messageVal || messageVal.length < 10) {
      validateField(messageInput, false, 'Message must be at least 10 characters.');
      isValid = false;
    } else {
      validateField(messageInput, true, '');
    }

    if (!isValid) {
      if (typeof showToast === 'function') {
        showToast('Please fix the validation errors before submitting.', 'danger');
      }
      return;
    }

    // Processing animation
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message... ⏳';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show success alert
      if (alertSuccess) {
        alertSuccess.style.display = 'block';
        alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset form and valid classes
      contactForm.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(el => {
        el.classList.remove('is-valid');
      });

      if (typeof showToast === 'function') {
        showToast('Your message was sent successfully to Favour Adeyemi!', 'success');
      }
    }, 1200);
  });
});
