document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const full_name = document.getElementById('full_name').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await window.api.auth.register({full_name, username, email, password});
            if (response.success) {
                alert('Registration successful! Redirecting to login page...');
                window.location.href = '../pages/login.html';
            }
            else {
                alert('Registration failed: ' + response.message);
            }
        }

        catch (error) {
            alert("Error: " + error.message);
        }
    });
});