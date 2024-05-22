import console from "console";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export interface RequestWithUser extends Request {
  user: any;
}
export const AuthMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["Authorization"] || req.headers["authorization"];
    console.log("Token in middleware=>", token);
    console.log("Headers=>", req.headers);
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) return res.status(401).json({ msg: "Unauthorized2" });
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Unauthorized3" });
  }
};
