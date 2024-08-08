const CartService = require("../Services/CartService");
const UserService = require("../Services/UserService");
const jwtProvider = require("../Utils/jwtProvider");
const bcrypt = require("bcrypt");

//* REGISTER CONTROLLER
const register = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);

    const jwt = jwtProvider.genrateToken(user._id);

    await CartService.createCart(user);

    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with email : ", email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password..." });
    }

    const jwt = jwtProvider.genrateToken(user._id);

    return res.status(200).send({ jwt, message: "Login Successfull" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const AuthController = {
  register,
  login,
};
module.exports = AuthController;
