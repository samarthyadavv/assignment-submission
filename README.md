# About the Project

This project was created in response to a "GrowthX" internship assignment, demonstrating proficiency in backend development, database management, and API design. The implementation showcases the ability to create a robust, system for managing assignment submissions in an educational or professional context.

# Assignment Submission Portal

A backend system for managing assignment submissions, developed as part of the GrowthX Internship Assignment. This system supports both users and admins, where users can upload assignments, and admins can review, accept, or reject them.


## Screenshots

![User registeration](/screenshots/Register.png)

![Adding assignments](/screenshots/Adding.png)

![Accepting assignments through admin](/screenshots/Accepting.png)

## Features

- User and Admin authentication
- Assignment upload functionality
- Assignment review system (accept/reject)
- MongoDB integration
- JWT-based authentication
- Express professional routing 
- zod for user input validation
- Bcrypt for password hashing in database

## Prerequisites

- Node.js (v14 or higher)
- express
- zod 
- bcrypt
- MongoDB
- npm

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Rayyan-Shk/assignment-submission-portal.git
cd assignment-submission-portal
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Rename `example_env` to `.env`
   - Add your MongoDB URL and JWT secret:
```
MONGODB_URI=your_mongodb_url_here
JWT_SECRET=your_jwt_secret_here
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured port).

## API Endpoints

### User Endpoints

- **Register User**: `POST /api/users/register`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Login**: `POST /api/users/login`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Upload Assignment**: `POST /api/users/upload`
  ```json
  {
    "task": "string",
    "admin": "string"
  }
  ```

- **Get All Admins**: `GET /api/users/admins`

### Admin Endpoints

- **Register Admin**: `POST api/admins/register`
  ```json
  {
    "username": "string",
    "password": "string",
  }
  ```

- **Get Assignments**: `GET /api/admins/assignments`
- **Accept Assignment**: `POST /api/admins/assignments/:id/accept`
- **Reject Assignment**: `POST /api/admins/assignments/:id/reject`

## Sample Assignment Object

```json
{
    "task": "Hello World",
    "admin": "Alok"
}
```

## Authentication

The system uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token_here>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Development

To run the project in development mode with hot reloading:
```bash
npm run dev
```
