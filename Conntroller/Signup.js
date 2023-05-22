const User = require("../Model/Signup")
const signup = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // Create a new user instance or document based on the User model/schema
      const user = new User({
        username,
        email,
        password,
        role,
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      res.status(500).json({ message: 'Signup failed', error: error.message });
    }
  };
  
  module.exports = {
    signup,
  };
  