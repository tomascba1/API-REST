const bcrypt = require("../utils/handlePass");
const {User} = require("../Schemas/userSchema");
const jwt = require("../utils/handleJWT")
const transporter = require("../utils/nodemailer")
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
    const profilePic = ""
  if(req.file){
    profilePic = `${public_url}/storage/${req.file.filename}`
  }
  const password = await bcrypt.hashPassword(req.body.password);
  const newUser = new User({ ...req.body, profilePic, password });
  newUser.save((error, result) => {
    if (error){
      error.status = 400; 
      next(error);
    } else { 
      res.status(200).json(newUser)
    }
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

  const forgotPass = async (req, res, next) =>{
    error = new Error("email not found")
    const user = await User.find().where({email: req.body.email})
    if(!user.length){
      error.status = 404
      return next(error)
    } 
    const userDataForToken = {id: user[0].id, name: user[0].name, email: user[0].email}
    const token = await jwt.tokenSing(userDataForToken, "15m")
    const link = `${process.env.public_url}/api/users/reset/${token}`

    const mailDetails = {
      from: "Tech-support@mydomain.com",
      to: userDataForToken.email,
      subjet: "Password Recovery",
      html: `<h2>Password Recovery Service</h2>
      <p>To reset password click link and follow instructions</p>
      <a href="${link}">Click to Reset Password</a>`
    }

    transporter.sendMail(mailDetails, (err, data) =>{
      if(err){
        next(err)
      } else {
        res.status(200).json({message: "Reset password email sent"})
      }
    })
  }

  const resetPass = async (req, res, next) =>{
    const {token} = req.params
    tokenStatus = await jwt.tokenVerify(token)
    if(tokenStatus instanceof Error){
      return next(tokenStatus)
    }  
      res.render("reset", {token, tokenStatus})
  }

  const saveNewPassword = async (req, res, next) =>{
    const {token} = req.params
    const tokenStatus = await jwt.tokenVerify(token)
    if(tokenStatus instanceof Error){
      return next(tokenStatus)
    } const newPassword = await bcrypt.hashPassword(req.body.password_1)
    console.log(newPassword)
    try {
      const updatedUser = await User.findByIdAndUpdate(tokenStatus.id, {password: newPassword})
      res.status(200).json({message: "Password change for user "+tokenStatus.name})
    } catch (error) {
      next(error)
    }
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

module.exports = { getAllUsers, deleteUser, createUser, updateUser, loginUser, forgotPass, resetPass, saveNewPassword};
