
let currentSection = 'home';
let isMenuOpen = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    setupScrollAnimations();
    setMinDate();
});

// Navigation Functions
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section with animation
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 100);
    }
    
    currentSection = sectionId;
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Update URL hash
    window.location.hash = sectionId;
}

// Form Validation and Submission
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Validation
    if (!validateName(name)) {
        showAlert('Please enter a valid name (at least 2 characters)', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    if (message.length < 10) {
        showAlert('Message must be at least 10 characters long', 'error');
        return;
    }
    
    // Simulate form submission
    showAlert('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    document.querySelector('.contact-form').reset();
    
    // Dynamic content update
    updateContactStatus('Message sent successfully!');
}

function submitBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('bookingName').value.trim();
    const email = document.getElementById('bookingEmail').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const guests = document.getElementById('bookingGuests').value;
    
    // Validation
    if (!validateName(name)) {
        showAlert('Please enter a valid name', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showAlert('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!validateDate(date)) {
        showAlert('Please select a valid future date', 'error');
        return;
    }
    
    if (!validateTime(time)) {
        showAlert('Please select a time between 5:00 PM and 10:00 PM', 'error');
        return;
    }
    
    if (!guests) {
        showAlert('Please select number of guests', 'error');
        return;
    }
    
    // Simulate booking confirmation
    const bookingDetails = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: guests
    };
    
    showBookingConfirmation(bookingDetails);
    
    // Reset form
    document.querySelector('.booking-form').reset();
}

// Validation Functions
function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

function validateTime(time) {
    // Since HTML input has min="17:00" max="22:00", just check if time exists
    return time && time.length > 0;
}

// Alert System
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    if (type === 'success') {
        alert.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
    } else {
        alert.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
    }
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Dynamic Content Updates
function updateContactStatus(message) {
    const contactInfo = document.querySelector('.contact-info');
    const statusDiv = document.createElement('div');
    statusDiv.className = 'contact-status';
    statusDiv.innerHTML = `<p style="color: #27ae60; font-weight: bold; margin-top: 1rem;">${message}</p>`;
    
    // Remove existing status
    const existingStatus = contactInfo.querySelector('.contact-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    contactInfo.appendChild(statusDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (statusDiv.parentElement) {
            statusDiv.remove();
        }
    }, 3000);
}

function showBookingConfirmation(details) {
    const confirmationHTML = `
        <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
            <h4>Booking Confirmed!</h4>
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Date:</strong> ${details.date}</p>
            <p><strong>Time:</strong> ${details.time}</p>
            <p><strong>Guests:</strong> ${details.guests}</p>
            <p>Confirmation email sent to: ${details.email}</p>
        </div>
    `;
    
    const bookingSection = document.getElementById('booking');
    const existingConfirmation = bookingSection.querySelector('.booking-confirmation');
    if (existingConfirmation) {
        existingConfirmation.remove();
    }
    
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'booking-confirmation';
    confirmationDiv.innerHTML = confirmationHTML;
    
    bookingSection.appendChild(confirmationDiv);
}

// Image Gallery Modal
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    
    // Add animation
    modal.style.animation = 'fadeIn 0.3s ease';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Social Media Hover Effects
function highlightSocial(element) {
    element.style.color = '#f39c12';
    element.style.transform = 'translateY(-2px)';
    element.style.transition = 'all 0.3s ease';
}

function unhighlightSocial(element) {
    element.style.color = '#ecf0f1';
    element.style.transform = 'translateY(0)';
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.intro-article, .menu-container, .photo-gallery, .contact-container, .booking-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Set minimum date for booking
function setMinDate() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .alert button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
    }
`;
document.head.appendChild(style);