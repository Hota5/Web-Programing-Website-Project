// ============================================
// GLOBAL STATE
// ============================================
let currentUser = null; // Stores the currently logged-in user object

// ============================================
// USER INITIALIZATION
// ============================================

/**
 * Load saved user from localStorage on page load
 * Restores user session if they were previously logged in
 */
function loadUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    updateUserMenu();
}

/**
 * Update the header menu based on login status
 * Shows different menu options for logged in vs logged out users
 */
function updateUserMenu() {
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    
    if (currentUser) {
        // User is logged in - show profile/logout options
        loggedInMenu.style.display = 'block';
        loggedOutMenu.style.display = 'none';
    } else {
        // User is logged out - show login/signup options
        loggedInMenu.style.display = 'none';
        loggedOutMenu.style.display = 'block';
    }
}

// ============================================
// TAB SWITCHING
// ============================================

/**
 * Switch to the Login tab in the auth form
 */
function showLogin() {
    document.querySelectorAll('.form-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.form-tab')[0].classList.add('active');
    document.getElementById('loginForm').classList.add('active');
}

/**
 * Switch to the Signup tab in the auth form
 */
function showSignup() {
    document.querySelectorAll('.form-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.form-tab')[1].classList.add('active');
    document.getElementById('signupForm').classList.add('active');
}

// ============================================
// LOGIN FUNCTIONALITY
// ============================================

/**
 * Handle login form submission
 * Validates credentials against stored users in localStorage
 */
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Retrieve all registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful - save user session
        currentUser = { firstName: user.firstName, lastName: user.lastName, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        showNotification('Login successful!');
        navigateTo('home');
    } else {
        // Login failed
        showNotification('Invalid email or password');
    }
}

// ============================================
// SIGNUP FUNCTIONALITY
// ============================================

/**
 * Handle signup form submission
 * Creates new user account and stores in localStorage
 */
function handleSignup(event) {
    event.preventDefault();
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate password confirmation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already registered
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered!');
        return;
    }
    
    // Create new user
    users.push({ firstName, lastName, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after signup
    currentUser = { firstName, lastName, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserMenu();
    
    showNotification('Account created successfully!');
    navigateTo('home');
}

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

/**
 * Log out current user
 * Clears session and returns to home page
 */
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserMenu();
    showNotification('Logged out successfully!');
    navigateTo('home');
}

// ============================================
// PROFILE PAGE
// ============================================

/**
 * Render user profile information
 * Displays user's personal details on the profile page
 */
function renderProfile() {
    if (!currentUser) return;
    
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <div class="profile-field">
            <strong>First Name:</strong>
            <span>${currentUser.firstName}</span>
        </div>
        <div class="profile-field">
            <strong>Last Name:</strong>
            <span>${currentUser.lastName}</span>
        </div>
        <div class="profile-field">
            <strong>Email:</strong>
            <span>${currentUser.email}</span>
        </div>
    `;
}

// ============================================
// GOOGLE SIGN-IN (Placeholder)
// ============================================

/**
 * Handle Google Sign-In button click
 * TODO: Implement actual Google OAuth when backend is ready
 */
function handleGoogleSignIn() {
    showNotification('Google Sign-In will be implemented in a future update');
}