// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close the mobile menu after clicking a link
        if (window.innerWidth <= 768) { // Check if in mobile view
            navLinksContainer.classList.remove('active');
            barsIcon.style.display = 'inline-block';
            timesIcon.style.display = 'none';
        }
    });
});

// Highlight active link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');
const barsIcon = hamburger.querySelector('.fa-bars');
const timesIcon = hamburger.querySelector('.fa-times');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    barsIcon.style.display = navLinksContainer.classList.contains('active') ? 'none' : 'inline-block';
    timesIcon.style.display = navLinksContainer.classList.contains('active') ? 'inline-block' : 'none';
});

// Form Validation and Submission
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessages = document.querySelectorAll('.error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous error messages
    errorMessages.forEach((error) => error.classList.remove('show'));

    // Validate form fields
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    // Name Validation (only letters and spaces allowed)
    if (name.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        document.getElementById('name-error').classList.add('show');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name.value.trim())) {
        document.getElementById('name-error').textContent = 'Name should contain only letters and spaces';
        document.getElementById('name-error').classList.add('show');
        isValid = false;
    }

    // Email Validation
    if (email.value.trim() === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        document.getElementById('email-error').classList.add('show');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('email-error').textContent = 'Invalid email address';
        document.getElementById('email-error').classList.add('show');
        isValid = false;
    }

    // Phone Validation (only digits, 10-15 digits long)
    if (phone.value.trim() === '') {
        document.getElementById('phone-error').textContent = 'Phone number is required';
        document.getElementById('phone-error').classList.add('show');
        isValid = false;
    } else if (!/^\d{10,15}$/.test(phone.value.trim())) {
        document.getElementById('phone-error').textContent = 'Phone number should contain 10-15 digits';
        document.getElementById('phone-error').classList.add('show');
        isValid = false;
    }

    // Message Validation
    if (message.value.trim() === '') {
        document.getElementById('message-error').textContent = 'Message is required';
        document.getElementById('message-error').classList.add('show');
        isValid = false;
    }

    if (!isValid) return;

    // Submit form data
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            form.reset();
            form.style.display = 'none';
            successMessage.style.display = 'block';
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        alert('Something went wrong. Please try again.');
    }
});

// Real-time validation for input fields
const inputs = document.querySelectorAll('.contact-form input');

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        const errorMessage = input.nextElementSibling; // Target the error message
        const checkmark = input.nextElementSibling.nextElementSibling; // Target the checkmark

        if (input.id === 'name') {
            // Name validation (only letters and spaces)
            if (!/^[A-Za-z\s]+$/.test(input.value.trim())) {
                errorMessage.textContent = 'Name should contain only letters and spaces';
                errorMessage.classList.add('show');
                checkmark.style.opacity = '0'; // Hide checkmark
            } else {
                errorMessage.textContent = '';
                errorMessage.classList.remove('show');
                checkmark.style.opacity = '1'; // Show checkmark
            }
        } else if (input.id === 'phone') {
            // Phone validation (only digits, 10-15 digits long)
            if (!/^\d{10,15}$/.test(input.value.trim())) {
                errorMessage.textContent = 'Phone number should contain 10-15 digits';
                errorMessage.classList.add('show');
                checkmark.style.opacity = '0'; // Hide checkmark
            } else {
                errorMessage.textContent = '';
                errorMessage.classList.remove('show');
                checkmark.style.opacity = '1'; // Show checkmark
            }
        } else if (input.id === 'email') {
            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                errorMessage.textContent = 'Invalid email address';
                errorMessage.classList.add('show');
                checkmark.style.opacity = '0'; // Hide checkmark
            } else {
                errorMessage.textContent = '';
                errorMessage.classList.remove('show');
                checkmark.style.opacity = '1'; // Show checkmark
            }
        }
    });
});

// Update copyright year dynamically
const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}

// Back-to-Top Button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// Newsletter Form Validation and Submission
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterError = document.getElementById('newsletter-error');
const newsletterSuccess = document.getElementById('newsletter-success');

if (newsletterForm) {
    // Real-time email validation
    newsletterEmail.addEventListener('input', () => {
        const email = newsletterEmail.value.trim();
        if (!email) {
            newsletterError.textContent = 'Email is required';
            newsletterError.classList.add('show');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newsletterError.textContent = 'Please enter a valid email address';
            newsletterError.classList.add('show');
        } else {
            newsletterError.textContent = '';
            newsletterError.classList.remove('show');
        }
    });

    // Form submission
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Clear previous error message
        newsletterError.textContent = '';
        newsletterError.classList.remove('show');

        // Validate email
        const email = newsletterEmail.value.trim();
        if (!email) {
            newsletterError.textContent = 'Email is required';
            newsletterError.classList.add('show');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newsletterError.textContent = 'Please enter a valid email address';
            newsletterError.classList.add('show');
            return;
        }

        // Submit form data using Formspree
        try {
            const response = await fetch('https://formspree.io/f/mwplovbv', {
                method: 'POST',
                body: new FormData(newsletterForm),
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                // Clear form and show success message
                newsletterForm.reset();
                newsletterSuccess.style.display = 'block';
                setTimeout(() => {
                    newsletterSuccess.style.display = 'none';
                }, 3000); // Hide success message after 3 seconds
            } else {
                throw new Error('Something went wrong. Please try again.');
            }
        } catch (error) {
            newsletterError.textContent = error.message;
            newsletterError.classList.add('show');
        }
    });
}


// Desktop Automatic Scrolling
let isScrolling = false; // Prevents multiple scroll triggers

window.addEventListener('wheel', (e) => {
    if (isScrolling) return; // Exit if already scrolling
    isScrolling = true;

    const sections = document.querySelectorAll('section'); // Get all sections
    let currentSectionIndex = 0;

    // Find the current section in view
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSectionIndex = index;
        }
    });

    // Determine the next section based on scroll direction
    let nextSectionIndex;
    if (e.deltaY > 0) { // Scrolling down
        nextSectionIndex = currentSectionIndex + 1;
    } else if (e.deltaY < 0) { // Scrolling up
        nextSectionIndex = currentSectionIndex - 1;
    }

    // Scroll to the next section if it exists
    if (sections[nextSectionIndex]) {
        sections[nextSectionIndex].scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Reset the scrolling flag after a delay
    setTimeout(() => {
        isScrolling = false;
    }, 800); // Adjust delay as needed
});
