import { JwtPayload } from "jsonwebtoken";
export interface AuthenticatedUser extends JwtPayload {
    id: number;
    username: string;
    password:string;
  }
  
export interface User {
  id: number;
  username: string;
  password: string;
}