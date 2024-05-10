function validatePassword(password) {
    if (!password) {
        return {
            error: true,
            errorType: 'EMPTY_PASSWORD'
        };
    }

    if (password.length < 8) {
        return {
            error: true,
            errorType: 'SHORT_PASSWORD'
        };
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return {
            error: true,
            errorType: 'NO_UPPERCASE'
        };
    }

    // Check if password contains at least one number
    if (!/[0-9]/.test(password)) {
        return {
            error: true,
            errorType: 'NO_NUMBER'
        };
    }

    // If all conditions pass, return no error
    return { error: false };
}

module.exports = { validatePassword };
