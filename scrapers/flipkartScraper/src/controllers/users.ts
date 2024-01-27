import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { Request, Response } from "express";


export const Login = async (req:Request, res:Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.password){
      const isPasswordCorrect = bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   }

    const token = jwt.sign(
      { email: user.username, id: user._id },
      process.env.JWT_SECRET||"",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const Signup = async (req:Request, res:Response) => {
  const { username, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "No password" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "New user added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const validateUser = async (req:Request,res:Response) => {
  const {username, password} = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(user.password){
      const isPasswordCorrect = bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    return res.status(400).json(error)
  }
};
