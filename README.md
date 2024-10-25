
```markdown
# Recipe Sharing Community - CookBook Server(Back-end)

Welcome to the **Recipe Sharing Community** server! This backend application powers the Cookbook, a platform for culinary enthusiasts to share, discover, and manage recipes. 

## Overview

This server is built with Express and TypeScript, providing a secure and efficient backend for handling user authentication, recipe management, and more. Let's get you set up to run it locally!

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Recipe Management**: Create, update, delete, and manage recipes effortlessly.
- **Email Notifications**: Stay connected with users via email.
- **Cloud Storage**: Store images securely using Cloudinary.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose ODM**: ODM for MongoDB.
- **TypeScript**: Adds type safety to JavaScript.
- **Bcrypt**: Secure password hashing.
- **Cloudinary**: Media management and storage.
- **JWT**: JSON Web Tokens for secure user sessions.

## Getting Started

Follow these steps to set up the server locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MdMuzahid07/cookbook_server.git
   cd cookbook_server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a .env File**:
   Set up your environment variables by creating a `.env` file in the root directory and populating it with the following:

   ```plaintext
   PORT=5000
   DB_URL=your_database_url
   NODE_ENV=development # or production
   BCRYPT_SALT_ROUNDS=10
   JWT_ACCESS_SECRET_KEY=your_access_secret_key
   JWT_REFRESH_SECRET_KEY=your_refresh_secret_key
   JWT_ACCESS_TOKEN_EXPIRES_IN=10d
   JWT_REFRESH_TOKEN_EXPIRES_IN=40d
   EMAIL_USER=your_google_app_email_address
   EMAIL_PASS=your_app_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_API_KEY=your_api_key
   FRONTEND_URL=example.com
   STORE_ID=your_store_id
   SIGNATURE_KEY=your_signature_key
   PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php
   PAYMENT_VERIFY_URL=your_verification_url
   SUCCESS_URL=your_success_url
   FAIL_URL=your_fail_url
   CANCEL_URL=http://localhost:5000
   ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```

5. **Access the API**: The server will be running on `http://localhost:5000`.

## Credentials

For testing purposes, you can use the following credentials:

- **Admin Email**: `mdmuzahid.dev@gmail.com`
- **Admin Password**: `admin123`

- **User Email**: `mdmuzahid7396@gmail.com`
- **User Password**: `11111111`
