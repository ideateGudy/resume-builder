document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!email || !password || !confirmPassword) {
          showCustomToast('Please enter all required fields', 'warning');
            return;
        }

        if (password !== confirmPassword) {
            showCustomToast('The passwords do not match', 'error');
            return;
        }

        try {
            const response = await fetch(`${backendConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response) {
                console.log(result);
                switch (result.status) {
                    case 'success':
                      showCustomToast(result.data.message, 'success');
                        break;
                    case 'error':
                        showCustomToast(result.error.errorMessage, 'error');
                        break;
                    default:
                        showCustomToast('Something went wrong. Please try again later.', 'error');
                        break;
                    
                }
            } else {
               showCustomToast("Something went wrong. Please try again later.", 'error');
            }
        } catch (error) {
            
           alert(error);
        }
    });
});
