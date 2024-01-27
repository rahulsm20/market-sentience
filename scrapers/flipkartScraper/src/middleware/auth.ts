import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { AuthenticatedUser,User } from "../types/jwtTypes";
const secret = process.env.JWT_SECRET as Secret

declare global{
  namespace Express{
    interface Request {
      user?: User;  
    }
  }
}
const auth = (req:Request, res:Response, next:NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthenticatedUser;
      req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default auth;
