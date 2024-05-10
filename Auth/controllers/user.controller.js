import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateAccessToken(_id, firstName) {
  return jwt.sign(
    {
      _id,
      firstName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

function generateRefreshToken(_id, firstName) {
  return jwt.sign(
    {
      _id,
      firstName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

function handleCreateNewAccessToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const accessToken = generateAccessToken(
      decodedToken._id,
      decodedToken.firstName
    );
    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

async function handleUserRegister(req, res) {
  const { firstName, lastName, email, password } = req.body;
  // Check for neccessary Field
  if (!(firstName && email && password)) {
    return res.status(400).json({
      msg: "All Field Required",
    });
  }

  // Check user exist or not
  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    return res.status(409).json({ msg: "User existed with same email" });
  }

  if (password.length < 8)
    return res.status(400).json({ msg: "Password Length is < 8" });

  // After confirming all checks we are going to create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({
    msg: "User Registered!!",
    userDetail: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  //Check all fields
  if (!(email && password)) {
    return res.status(400).json({ msg: "All Field Required" });
  }

  //Check if email exist or not
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: "Invalid User Credentials!!" });

  //check if password exist or not
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(401).json({ msg: "Invalid Password" });
  const accessToken = generateAccessToken(user._id, user.firstName);
  const refreshToken = generateRefreshToken(user._id, user.firstName);
  const cookieOption = {
    secure: true,
    httpOnly: true,
  };
  //Set token to cookie
  res
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, cookieOption);
  return res
    .status(200)
    .json({ msg: "User Logged In", access_token: accessToken });
}

export { handleUserRegister, handleUserLogin, handleCreateNewAccessToken };
