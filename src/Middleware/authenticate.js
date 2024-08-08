const jwtProvider = require("../Utils/jwtProvider");
const UserService = require("../Services/UserService");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Check if the token has the 'Bearer' prefix, then extract the token part
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(404).send({ message: "token not found" });
    }

    const userId = await jwtProvider.getUserIdFromToken(token);

    const user = await UserService.findUserById(userId);

    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  next();
};

module.exports = authenticate;
