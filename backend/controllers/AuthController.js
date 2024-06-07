const AuthUtils = require("../utils/authUtils");
const db = require("../utils/databaseUtils");
const validator = require("validator");

async function register(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        status: "error",
        error: {
          errorCode: "EMAIL_PASSWORD_REQUIRED",
          errorMessage: "Email and password are required",
        },
      });
  }

  const { error, errorType } = AuthUtils.validatePassword(password);
  const { isEmail } = validator;

  if (error) {
    switch (errorType) {
      case "SHORT_PASSWORD":
        return res
          .status(400)
          .json({
            status: "error",
            error: {
              errorCode: "SHORT_PASSWORD",
              errorMessage: "Password must be at least 8 characters long",
            },
          });
      case "NO_UPPERCASE":
        return res
          .status(400)
          .json({
            status: "error",
            error: {
              errorCode: "NO_UPPERCASE",
              errorMessage:
                "Password must contain at least one uppercase letter",
            },
          });
      case "NO_NUMBER":
        return res
          .status(400)
          .json({
            status: "error",
            error: {
              errorCode: "NO_NUMBER",
              errorMessage: "Password must contain at least one number",
            },
          });
      default:
        return res
          .status(400)
          .json({
            status: "error",
            error: {
              errorCode: "EMPTY_PASSWORD",
              errorMessage: "Password is required",
            },
          });
    }
  } else if (!isEmail(email)) {
    return res
      .status(400)
      .json({
        status: "error",
        error: { errorCode: "INVALID_EMAIL", errorMessage: "Invalid email" },
      });
  }

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({
          status: "error",
          error: {
            errorCode: "EMAIL_ALREADY_EXISTS",
            errorMessage: "Email already exists",
          },
        });
    }

    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      password,
    ]);
    return res
      .status(200)
      .json({
        status: "success",
        data: { message: "User registered successfully" },
      });
  } catch (err) {
    console.error("Error registering user:", err);
    return res
      .status(500)
      .json({
        status: "error",
        error: {
          errorCode: "INTERNAL_SERVER_ERROR",
          errorMessage: "Internal server error",
        },
      });
  }
}

async function login(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({
        status: "error",
        error: {
          errorCode: "EMAIL_PASSWORD_REQUIRED",
          errorMessage: "Email and password are required",
        },
      });
  }

  const existingUser = await db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );
  if (existingUser.length > 0) {
    return res
      .status(200)
      .json({
        status: "success",
        data: { message: "User logged in successfully" },
      });
  } else {
    return res
      .status(400)
      .json({
        status: "error",
        error: {
          errorCode: "INVALID_CREDENTIALS",
          errorMessage: "Invalid email or password",
        },
      });
  }
}

module.exports = { register, login };
