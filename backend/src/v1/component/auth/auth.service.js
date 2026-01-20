const User = require("../../../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs");

const register=async (data) =>{
    const { name, email, password } = data;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already exists");

    // create user
    const user = await User.create({ name, email, password: await bcrypt.hash(password,10) });

    return {
        message: "Registered successfully",
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
        },
    };
}

const login=async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid password");

    // Generate token
    const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    // Generate Refresh Token (long-lived)
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    user.refreshToken=refreshToken;
    await user.save();

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
        user: { id: user._id, name: user.name, email: user.email , role:user.role},
    };
}


const generateNewAccessToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("Invalid user");

    // User log out
    if(!(user.refreshToken)) throw new Error("User logout from all devices");

    // Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { accessToken };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

const logout = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("Invalid user");

    // Remove refresh token
    user.refreshToken = null;
    await user.save();
};

module.exports = {register,login,generateNewAccessToken,logout};