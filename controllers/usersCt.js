const bcrypt = require("../utils/handlePass");
const {User} = require("../models/schemas");
const public_url = process.env.public_url;
//Get all users
const getAllUsers = async (req, res, next) => {
  const data = await User.find();
  try {
    !data.length
      ? next()
      : res.json(data).status(200)
  } catch (error) {
    error.status = 500
    next(error)
  }
};
//Create user
const createUser = async (req, res, next) => {
  const profilePic = `${public_url}/storage/${req.file.filename}`
  const password = await bcrypt.hashPassword(req.body.password);
  const newUser = new User({ ...req.body, profilePic, password });
  newUser.save((error) => {
    if (error){
      error.status = 400; 
      next(error);
    } else { res.status(200);}
  });
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(user)
  } catch (error) {
    next()
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ user: user.fullName, message: "usuario borrado con exito" });
  } catch (error) {
    next()
  }
};

module.exports = { getAllUsers, deleteUser, createUser, updateUser};
