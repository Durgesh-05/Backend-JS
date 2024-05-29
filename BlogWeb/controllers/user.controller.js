import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

function generateAccessToken(_id, role, name) {
  const accessToken = jwt.sign(
    {
      _id: _id,
      role: role,
      name: name,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return accessToken;
}

function renderSignupPage(req, res) {
  return res.render("signup");
}

function renderSigninPage(req, res) {
  return res.render("signin");
}

function handleUserLogout(req, res) {
  res.clearCookie("accessToken");
  res.redirect("/");
}

async function handleUserSignup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!(fullName && email && password))
      return res.render("signup", {
        message: "All Fields Required.",
      });

    if (password.length < 8)
      return res.render("signup", {
        message: "Password must be at least 8 characters long.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.render("signup", {
        message: "Email already exists. Please login.",
      });

    const user = await User.create({
      fullName,
      email,
      password,
    });
    res.redirect("/api/v1/user/signin");
    // return res.status(201).json({
    //   message: "User Created Successfully",
    //   user: {
    //     _id: user._id,
    //     email,
    //     role: user.role,
    //   },
    // });
  } catch (error) {
    res.render("signup", { message: "Internal Server Error" });
    console.log("Internal Error: ", error);
  }
}

async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.render("signup", {
        message: "All Fields Required.",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.render("signin", {
        message: "User Not Found!",
      });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.render("signin", { error: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user._id, user.role, user.fullName);
    const cookieOption = {
      secure: true,
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.redirect("/");
    // return res
    //   .status(200)
    //   .json({ msg: "User Logged in Successfully", access_token: accessToken });
  } catch (error) {
    res.render("signin", { message: "Internal Server Error" });
    console.log("Internal Server Error: ", error);
  }
}

export {
  renderSignupPage,
  renderSigninPage,
  handleUserSignin,
  handleUserSignup,
  handleUserLogout,
};
