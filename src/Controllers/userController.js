const UserService = require("../Services/UserService");
const jwtProvider = require("../Utils/jwtProvider");

//* GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization;

    // Check if the token has the 'Bearer' prefix, then extract the token part
    if (jwt.startsWith("Bearer ")) {
      jwt = jwt.split(" ")[1];
    }

    if (!jwt) {
      return res.status(404).send({ message: "token not found" });
    }

    const user = await UserService.getUserProfileByToken(jwt);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//* GET ALL USERS CONTROLLER
const getAllUsers = async (req, res) => {
   try {
    const users = await UserService.getAllUsers();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const UserController = {
  getAllUsers,
  getUserProfile,
};

module.exports = UserController;
