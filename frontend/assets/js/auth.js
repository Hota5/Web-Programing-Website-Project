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
        const showAdmin = currentUser.role === 'admin' ? 'inline' : 'none';
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
    
    RestClient.post('auth/login', { email, password }, 
        function(result) {
            localStorage.setItem('user_token', result.data.token);
            const decoded = Utils.parseJwt(result.data.token);
            currentUser = decoded.user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserMenu();
            window.location.hash = 'home';
        },
        function(error) {
            showNotification('Login failed');
        }
    );
}

// Process signup form submission
function handleSignup(e){
    e.preventDefault();
    
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!');
        return;
    }
    RestClient.post('auth/register', 
        { 
            first_name: firstName, 
            last_name: lastName, 
            email, 
            password 
        },
        function(result) {
            showNotification('Account created successfully!');
            
            RestClient.post('auth/login', { email, password },
                function(loginResult) {
                    localStorage.setItem('user_token', loginResult.data.token);
                    const decoded = Utils.parseJwt(loginResult.data.token);
                    currentUser = decoded.user;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    updateUserMenu();
                    window.location.hash = 'home';
                },
                function(error) {
                    showLogin();
                }
            );
        },
        function(error) {
            const message = error.responseJSON?.error || 'Registration failed';
            showNotification(message);
        }
    );
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
            <span>${currentUser.first_name}</span>
        </div>
        <div class="profile-field">
            <strong>Last Name:</strong>
            <span>${currentUser.last_name}</span>
        </div>
        <div class="profile-field">
            <strong>Email:</strong>
            <span>${currentUser.email}</span>
        </div>
        ${currentUser.role === 'admin' ? `
        <div class="profile-field">
            <strong>Role:</strong>
            <span class="badge bg-danger">Administrator</span>
        </div>
        ` : ''}
    `;
}

