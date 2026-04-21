import { Request } from "express";
import { IUser } from "./user.types";

export interface AuthRequest extends Request {
    user?: IUser;
}