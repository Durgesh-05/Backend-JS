const { User } = require("../models/user.model");

async function handleGetAllUser(req, res) {
  const allUsers = await User.find({});
  if (!allUsers) return res.status(404).json({ msg: "users not found!!" });
  return res.json({ msg: "success", UserList: allUsers });
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "users not found!!" });
  return res.json({ msg: "success", user });
}

async function handleUpdateUserById(req, res) {
  const body = req.body;
  //Suppose job role is changing
  if (!body) return res.status(400).json({ msg: "nothing is there to update" });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { jobRole: body.job_title },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({
      msg: "User job role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body.email ||
    !body.first_name ||
    !body.last_name ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields Required..." });
  }
  try {
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobRole: body.job_title,
    });
    console.log("result ", result);
    return res.status(201).json({ msg: "success", id: result._id });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ msg: "user not found!" });
    return res.json({ msg: "user deleted successfully" });
  } catch (error) {
    console.log("Mongo Inbuilt Error! ", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  handleCreateNewUser,
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
