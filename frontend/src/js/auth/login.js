document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        try {
            const response = await window.api.auth.login({email: username, password});
            if (response.success) {
                alert('Login successful! Redirecting to home page...');
                window.location.href = '../pages/home.html';
            }
            else {
                alert('Login failed: ' + response.message);
            }
        }

        catch (error) {
            alert("Error: " + error.message);
        }
    });
});