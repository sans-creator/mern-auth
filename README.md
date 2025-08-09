# MERN Authentication

**MERN Authentication** is a full‑stack template that demonstrates how to implement secure user management using the MERN stack (MongoDB, Express, React, and Node.js). The backend exposes a series of RESTful endpoints for registering users, logging in, verifying accounts, resetting passwords, and accessing protected user data. The frontend provides simple forms for interacting with these endpoints using React and Tailwind CSS.

## Features

This project includes everything you need to handle common authentication workflows:

- **User registration** – create a new user by providing a name, email, and password. Passwords are hashed using bcryptjs before being saved.
- **Email welcome and verification** – a welcome message is sent when a user registers, and a six‑digit verification code can be sent to confirm the account. Verification codes expire after 24 hours.
- **JWT‑based login** – upon successful login, the server generates a JWT token and stores it in an HTTP‑only cookie; the token is set to expire after seven days.
- **Logout** – clears the authentication cookie to sign the user out.
- **Password reset** – send a password reset code and update the password via dedicated endpoints.
- **Account verification** – submit the verification code to mark the account as verified and prevent re‑sending OTP codes if already verified.
- **Protected routes** – middleware checks for a valid JWT stored in cookies before allowing access to certain endpoints; user information is then added to the request object for downstream handlers.
- **User data retrieval** – authenticated users can request their own name and verification status via `/api/user/data`.
- **Built‑in email service** – uses Nodemailer to send welcome and verification emails.

## Tech Stack

| **Layer**            | **Technologies**                                                                 |
|----------------------|----------------------------------------------------------------------------------|
| **Frontend**         | React, React Router, Vite, and Tailwind CSS (styles defined in `tailwind.config.js`)|
| **Backend**          | Node.js with Express.js, MongoDB with Mongoose, and environment configuration via dotenv |
| **Authentication**   | JSON Web Tokens (JWT) for session handling, bcryptjs for password hashing, cookie‑parser for parsing cookies |
| **Email & OTP**      | Nodemailer for sending emails; random six‑digit OTPs for account verification and password resets |
| **Utilities**        | CORS for cross‑origin requests, dotenv for environment variables, nodemon for development server restarts |

## Prerequisites

To run this project you will need:

- **Node.js** version 18 or higher and npm installed.
- **MongoDB** – either a local instance or an Atlas connection string.
- **SMTP credentials** for sending emails with Nodemailer (e.g., Gmail or another provider).
- A `.env` file in the server directory with the following variables:

    ```env
    PORT=4000
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    SENDER_EMAIL=<email_address_used_to_send_otp>
    SENDER_PASSWORD=<email_password_or_app_password>
    NODE_ENV=development
    ```

- A `.env` file in the client directory containing the API base URL:

    ```env
    VITE_BACKEND_URL=http://localhost:4000
    ```

## Getting Started

Follow these steps to set up the project locally:

### Backend

1. Clone the repository and navigate to the server folder:

    ```bash
    git clone https://github.com/sans-creator/mern-auth.git
    cd mern-auth/server
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with the variables shown above.

4. Start the server using nodemon:

    ```bash
    npm run server
    ```

    The API will run on `http://localhost:4000` by default.

### Frontend

1. Open a new terminal window and navigate to the client folder:

    ```bash
    cd mern-auth/client
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with `VITE_BACKEND_URL` pointing to the backend.

4. Start the development server:

    ```bash
    npm run dev
    ```

    Visit `http://localhost:5173` in your browser to use the app.

## API Endpoints

The server defines two routers under `/api/auth` and `/api/user`. Many routes require authentication via the JWT cookie.

| **Method** | **Route**                       | **Auth?** | **Description**                                          |
|------------|---------------------------------|-----------|----------------------------------------------------------|
| POST       | `/api/auth/register`            | No        | Register a new user                                      |
| POST       | `/api/auth/login`               | No        | Authenticate and set a JWT cookie                        |
| POST       | `/api/auth/logout`              | Yes       | Clear the JWT cookie and log out                         |
| POST       | `/api/auth/send-verify-otp`     | Yes       | Send an OTP to verify the user’s email                   |
| POST       | `/api/auth/verify-account`      | Yes       | Submit the OTP to mark the account as verified           |
| POST       | `/api/auth/is-auth`             | Yes       | Check if the user’s JWT token is valid                   |
| POST       | `/api/auth/send-reset-otp`      | No        | Send a reset password OTP to the user’s email            |
| POST       | `/api/auth/reset-password`      | No        | Reset the user’s password after submitting the OTP       |
| GET        | `/api/user/data`                | Yes       | Return the logged‑in user’s name and verification status|

## Middleware

All routes that require authentication use the `userAuth` middleware to verify the JWT cookie. If the token is missing, expired, or invalid, the middleware returns a 401 error. Upon successful verification, it attaches the user ID to the request body for subsequent handlers.

## Usage

1. Register a new account via the sign‑up form.
2. Check your email for a welcome message and click the verify link (or use the provided OTP) to confirm your account.
3. Log in using your email and password – the server will issue a JWT cookie valid for seven days.
4. After logging in, visit pages that require authentication (such as retrieving user data) to see your information.
5. If you forget your password, request a password reset OTP and then submit the new password along with the OTP to update it.
