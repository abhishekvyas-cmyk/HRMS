const authService = require("./auth.service");

const register=async (req, res)=> {
try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

const login=async (req, res) => {
try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const data = await authService.generateNewAccessToken(refreshToken);

    res.json({
      message: "Token refreshed",
      accessToken: data.accessToken,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


const logout = async (req, res) => {
    try {
        await authService.logout(req.user.id);
        return res.json({ message: "Logged out successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Logout failed" });
    }
};

module.exports = {register,login,refreshAccessToken,logout};