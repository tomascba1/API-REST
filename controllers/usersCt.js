const bcrypt = require("../utils/handlePass");
const {User} = require("../models/schemas");
const jwt = require("../utils/handleJWT")
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

const loginUser = async (req, res, next) =>{
  let error = new Error("Email or Password invalid")
  const user = await User.find().where({email: req.body.email})
  if(!user.length){
    error.status = 401
    return next(error)
  }
  const hashedPass = user[0].password
  const match = await bcrypt.comparePassword(req.body.password, hashedPass)
  if (!match) {
    error.status = 401
    return next(error)
  }
    const userForToken = {
      name: user[0].name,
      userName : user[0].userName,
      email: user[0].email
    }
    const accesToken =  await jwt.tokenSing(userForToken, "24h")
    res.status(200).json({message: "Acces granted", token: accesToken, userData: userForToken})

  }

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

module.exports = { getAllUsers, deleteUser, createUser, updateUser, loginUser};
