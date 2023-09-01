import User from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import cloudinary from "../cloudinary/cloudinary.js";
import { log } from "console";
import path from "path";
import uploadprofile from "../middleware/MuterUser.js";
dotenv.config();

export const registe = async (req, res, next) => {
  // const {email , username , password , fullname} = req.body
  const email = req.body.email;
  const fullname = req.body.fullname;
  const username = req.body.username;
  const passwords = req.body.password;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwords, salt);
    const newUser = new User({
      email: email,
      fullname: fullname,
      username: username,
      password: hash,
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(404).json({ msg: "บันทึกข้อมูลไม่สำเร็จ" });
    next(err);
  }
};

export const login = async (req, res, next) => {
   const {username , password} = req.body;
   console.log(username , password);
  try {
    const user = await User.findOne({ username: username });
    if (!user) return next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wromg password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
    next("Login Successfully!");
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const updateUser = async (req, res, next) => {
  // const fullname = req.body.fullname
  // const sex = req.body.sexs
  const { fullname, sex } = req.body;
  let user = req.params.userid;
  const image = req.file ? req.file.filename : null;
  console.log("ShowID:", user);
  try {
    const curFile = await User.findById(user);
    if (image) {
      const file_id = curFile.avatar.public_id;
      if (file_id) {
        await cloudinary.uploader.destroy(file_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: image,
        resource_type: "auto",
        folder: "avatar",
      });
      // const data = User.findOne({_id:user})
      // if(data){
      //   // const salt = bcrypt.genSaltSync(10)
      //   // const hash = bcrypt.hashSync(passwords, salt)
      User.findById(user)
        .then(function (models) {
          console.log(models);
          fs.unlinkSync(`public/profile/${models.avatar.image_name}`);
        })
        .catch(function (err) {
          console.log(err);
        });
      const updateUsers = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            fullname: fullname,
            avatar: {
              public_id: result.public_id,
              avatar_url: result.secure_url,
              image_name: image,
            },
            sex: sex,
          },
        },
        { new: true }
      );
      console.log(updateUsers?.avatar?.image_name);
      res.status(200).json({ details: updateUsers });
      // res.send({succeess:true ,msg:"Updata User Successfully !"})
    }
    if (!image) {
      // const data = User.findOne({_id:user})
      // if(data){
      // const salt = bcrypt.genSaltSync(10)
      // const hash = bcrypt.hashSync(passwords, salt)
      User.findByIdAndUpdate(user)
        .then(function (models) {
          console.log(models);
          fs.unlinkSync(`public/profile/${models?.avatar?.image_name}`);
        })
        .catch(function (err) {
          console.log(err);
        });
      const updateUsers = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            fullname: fullname,
            sex: sex,
          },
        },
        { new: true }
      );
      res.status(200).json({ details: updateUsers });
      // res.send({succeess:true ,msg:"Updata User Successfully !"})
    }
  } catch (err) {
    next(err);
  }
};

export const UserDelete = async (req, res) => {
  const userId = req.params.userid;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("Delete Succesfully ('-')");
  } catch (err) {
    res.status(404).json("NoT Delete User !");
    console.log(err);
  }
};

export const loginLine = async (req, res, next) => {
  try {
    const { userID, displayName, pictureUrl } = req.body;
    var data = {
      fullname: displayName,
      username: userID,
      avatar: {
        avatar_url: pictureUrl,
      },
    };
    var user = await User.findOneAndUpdate(
      { username: userID },
      { new: true }
    );
    if (user) {
      console.log("user updata");
    } else {
      user = new User(data);
      await user.save();
      console.log("new user ");
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
    next("Login Successfully!");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
