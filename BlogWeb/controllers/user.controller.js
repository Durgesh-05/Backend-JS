import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

function renderSignupPage(req, res) {
  return res.render("signup");
}

function renderSigninPage(req, res) {
  return res.render("signin");
}

async function handleUserSignup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!(fullName && email && password))
      return res.status(400).json({
        message: "All Fields Required.",
      });

    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({
        message: "Email already exists. Please login.",
      });

    const user = await User.create({
      fullName,
      email,
      password,
    });
    res.render("signin");
    return res.status(201).json({
      message: "User Created Successfully",
      user: {
        _id: user._id,
        email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Internal Error: ", error);
  }
}

async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(400).json({
        message: "All Fields Required",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({
        message: "User Not Found!",
      });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const cookieOption = {
      secure: true,
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.render("homepage");
    return res
      .status(200)
      .json({ msg: "User Logged in Successfully", access_token: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Internal Server Error: ", error);
  }
}

export {
  renderSignupPage,
  renderSigninPage,
  handleUserSignin,
  handleUserSignup,
};
