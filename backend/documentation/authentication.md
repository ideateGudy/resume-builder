
### API Endpoints Documentation

#### 1. `POST /api/auth/register`

- **Description**: Registers a new user with the provided email and password.
- **Request Body**:
  - `email` (string, required): User's email address.
  - `password` (string, required): User's chosen password.
- **Response**:
  - `200 OK`: User registered successfully.
    - Body: `{ "status": "success", "data": { "message": "User registered successfully" } }`
  - `400 Bad Request`: Invalid or missing data.
    - Body: `{ "status": "error", "error": { "errorCode": "...", "errorMessage": "..." } }`
      - Error Codes:
        - `EMAIL_PASSWORD_REQUIRED`: Email and password are required.
        - `SHORT_PASSWORD`: Password must be at least 8 characters long.
        - `NO_UPPERCASE`: Password must contain at least one uppercase letter.
        - `NO_NUMBER`: Password must contain at least one number.
        - `EMPTY_PASSWORD`: Password is required.
        - `INVALID_EMAIL`: Invalid email.
        - `EMAIL_ALREADY_EXISTS`: Email already exists.
  - `500 Internal Server Error`: Server encountered an unexpected issue.
    - Body: `{ "status": "error", "error": { "errorCode": "INTERNAL_SERVER_ERROR", "errorMessage": "Internal server error" } }`

#### 2. `POST /api/auth/login`

- **Description**: Logs in a user with the provided email and password.
- **Request Body**:
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response**:
  - `200 OK`: User logged in successfully.
    - Body: `{ "status": "success", "data": { "message": "User logged in successfully" } }`
  - `400 Bad Request`: Invalid or missing credentials.
    - Body: `{ "status": "error", "error": { "errorCode": "INVALID_CREDENTIALS", "errorMessage": "Invalid email or password" } }`
      - Error Codes:
        - `EMAIL_PASSWORD_REQUIRED`: Email and password are required.
  - `500 Internal Server Error`: Server encountered an unexpected issue.
    - Body: `{ "status": "error", "error": { "errorCode": "INTERNAL_SERVER_ERROR", "errorMessage": "Internal server error" } }`

---
