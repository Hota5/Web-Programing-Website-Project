let currentUser = null;

// Load logged in user from storage 
function loadUser() {
    const saved = localStorage.getItem('currentUser');
    if (saved) currentUser = JSON.parse(saved);
    updateUserMenu();
}

// Show/hide menu items based on login status and admin rights
function updateUserMenu() {
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const adminNavLink = document.getElementById('adminNavLink');
    
    if (currentUser) {
        loggedInMenu.style.display = 'block';
        loggedOutMenu.style.display = 'none';
        
        // Show/hide admin nav link
        const showAdmin = currentUser.isAdmin ? 'inline' : 'none';
        adminNavLink.style.display = showAdmin;
    } else {
        loggedInMenu.style.display = 'none';
        loggedOutMenu.style.display = 'block';
        adminNavLink.style.display = 'none';
    }
}

// Switch to login tab
function showLogin() {
    document.querySelectorAll('.form-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.form-tab')[0].classList.add('active');
    document.getElementById('loginForm').classList.add('active');
}

// Switch to signup tab
function showSignup() {
    document.querySelectorAll('.form-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.form-tab')[1].classList.add('active');
    document.getElementById('signupForm').classList.add('active');
}

// Process login form submission
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    
    if (email === 'admin@gmail.com' && password === 'admin123') {
        currentUser = { 
            firstName: 'Admin', 
            lastName: 'User', 
            email: email,
            isAdmin: true 
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        window.location.hash = 'admin';
        return;
    }
    
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { 
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email,
            isAdmin: false 
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        window.location.hash = 'home';
    } else {
        showNotification('Invalid email or password');
    }
}

// Process signup form submission
function handleSignup(e) {
    e.preventDefault();
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    
    if (email === 'admin@gmail.com') {
        showNotification('This email is reserved for admin use');
        return;
    }
    
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!');
        return;
    }
    
    
    users.push({ firstName, lastName, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    
    currentUser = { firstName, lastName, email, isAdmin: false };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserMenu();
    window.location.hash = 'home';
}

// Log out current user
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserMenu();
    window.location.hash = 'home';
}

// Display user profile information
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
        ${currentUser.isAdmin ? `
        <div class="profile-field">
            <strong>Role:</strong>
            <span class="badge bg-danger">Administrator</span>
        </div>
        ` : ''}
    `;
}

// Placeholder for future Google Sign-In 
function handleGoogleSignIn() {
    showNotification('Google Sign-In will be implemented in a future update');
}