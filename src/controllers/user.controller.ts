import console from "console";
import { Request, Response } from "express";
import User from "../models/user.model";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, msg: "User Created" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const foundUser: any = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await foundUser.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await foundUser.getJwtToken();
    console.log(token);
    return res.json({ token, msg: "Login Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logout Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
