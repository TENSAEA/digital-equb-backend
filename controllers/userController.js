const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // Create user
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    // Create token (implement the generateAuthToken method on the user instance)
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Authenticate user (implement the findByCredentials static method on the User model)
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = generateToken(user._id);
    await sendPasswordResetEmail(
      user.email,
      resetToken,
      req.protocol,
      req.get("host")
    );
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
