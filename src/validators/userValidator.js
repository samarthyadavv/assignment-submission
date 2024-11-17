const { z } = require('zod');

// Validation schema for register and login
const userSchema = z.object({
  username: z.string().email({ message: "Username must be a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character" })
});

// Validate data for registration
const validateRegister = (data) => {
  return userSchema.parse(data);
};

// Validate data for login
const validateLogin = (data) => {
  return userSchema.parse(data);
};

module.exports = { validateRegister, validateLogin };

// This is the Zod library i have learned through out my coding journey,
// A cleaner way for input validation instead of long javascript jargons
