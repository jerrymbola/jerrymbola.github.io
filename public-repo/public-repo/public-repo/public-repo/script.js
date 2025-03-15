// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky navigation
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Toggle icons
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active'); // Revert to hamburger icon
    });
});

// Back to Top
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Initialize intl-tel-input
const phoneInput = document.getElementById('phone');
const iti = window.intlTelInput(phoneInput, {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js",
    preferredCountries: ['us', 'gb', 'ke', 'in', 'ng'],
    separateDialCode: true,
    initialCountry: 'auto',
    geoIpLookup: function (callback) {
        fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN')
            .then(response => response.json())
            .then(data => callback(data.country))
            .catch(() => callback('us'));
    },
});

// Helper function to validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Helper function to validate name (no digits allowed)
function validateName(name) {
    return /^[A-Za-z\s]+$/.test(name);
}

// Function to validate a field and toggle the checkmark
function validateField(input, validator) {
    const formGroup = input.closest('.form-group');
    const checkmark = formGroup.querySelector('.checkmark');
    const errorMessage = formGroup.querySelector('.error-message');

    if (validator(input.value.trim())) {
        formGroup.classList.add('valid');
        errorMessage.style.display = 'none';
    } else {
        formGroup.classList.remove('valid');
        errorMessage.style.display = 'block';
    }
}

// Add event listeners for dynamic validation
document.getElementById('name').addEventListener('input', function () {
    validateField(this, validateName);
});

document.getElementById('email').addEventListener('input', function () {
    validateField(this, validateEmail);
});

document.getElementById('phone').addEventListener('input', function () {
    const formGroup = this.closest('.form-group');
    const checkmark = formGroup.querySelector('.checkmark');
    const errorMessage = formGroup.querySelector('.error-message');

    if (iti.isValidNumber()) {
        formGroup.classList.add('valid');
        errorMessage.style.display = 'none';
    } else {
        formGroup.classList.remove('valid');
        errorMessage.style.display = 'block';
    }
});

document.getElementById('message').addEventListener('input', function () {
    const formGroup = this.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    if (this.value.trim() !== '') {
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
    }
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('phone-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    // Validate name
    if (name === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        document.getElementById('name-error').style.display = 'block';
        return;
    } else if (!validateName(name)) {
        document.getElementById('name-error').textContent = 'Name cannot contain digits';
        document.getElementById('name-error').style.display = 'block';
        return;
    }

    // Validate email
    if (email === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        document.getElementById('email-error').style.display = 'block';
        return;
    } else if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').style.display = 'block';
        return;
    }

    // Validate phone
    if (phone === '') {
        document.getElementById('phone-error').textContent = 'Phone number is required';
        document.getElementById('phone-error').style.display = 'block';
        return;
    } else if (!iti.isValidNumber()) {
        document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
        document.getElementById('phone-error').style.display = 'block';
        return;
    }

    // Validate message
    if (message === '') {
        document.getElementById('message-error').textContent = 'Message is required';
        document.getElementById('message-error').style.display = 'block';
        return;
    }

    // If all fields are valid, submit the form to Formspree
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    // Add the full phone number with country code to the form data
    const fullPhoneNumber = iti.getNumber();
    formData.append('phone', fullPhoneNumber);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                // Show success message
                document.getElementById('contact-form').style.display = 'none';
                document.getElementById('success-message').style.display = 'flex';

                // Refresh the page after 3 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // 5000 milliseconds = 5 seconds
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            alert('Oops! Something went wrong. Please try again.');
        });
});

// Automate Copyright Year
document.getElementById('copyright').innerHTML = `&copy; ${new Date().getFullYear()} Jerry Mbola. All rights reserved.`;