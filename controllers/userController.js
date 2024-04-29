const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    // Check if all required fields are filled
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create user
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    // Respond with the user object without the password
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(201).send({ user: userResponse });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Assuming the user is authenticated and their id is in req.user
    const user = await User.findById(req.user.id); // or req.user._id depending on how you set it in the auth middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password and any sensitive information from the result
    const userProfile = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // Include any other fields you want to return
    };

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: "The user profile could not be found." });
    }

    if (user._id.toString() !== id) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to update this profile." });
    }

    if (req.file) {
      updates.photo = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updates, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully.", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
