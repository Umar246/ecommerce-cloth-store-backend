const Users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwtProvider = require("../Utils/jwtProvider");

//* CREATE USER
const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password, role, mobile } = userData;

    const isUserExisted = await Users.findOne({ email });

    if (isUserExisted) {
      throw new Error("User already existed with email : ", email);
    }

    password = await bcrypt.hash(password, 8);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role,
      mobile,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND USER BY ID
const findUserById = async (userId) => {
  try {
    const user = await Users.findById(userId);
    //.populate("address");

    if (!user) {
      throw new Error("User not found with id : ", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND USER BY EMAIL
const findUserByEmail = async (email) => {
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      throw new Error("User not found with email : ", email);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* GET USER PROFILE BY TOKEN
const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = Users.findById(userId);

    if (!user) {
      throw new Error("User not found with Id ", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* GET ALL USERS
const getAllUsers = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const UserService = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  getUserProfileByToken,
};
module.exports = UserService;
