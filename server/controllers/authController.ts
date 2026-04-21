import { Request, Response } from "express";

import {
  registerSchema,
  loginSchema
} from "../validators/authValidator";

import {
  registerUserService,
  loginUserService
} from "../services/authService";

import { AuthRequest } from "../types/express.types";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const data = await registerUserService(
      validatedData
    );

    return res.status(201).json(data);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const data = await loginUserService(
      validatedData
    );

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message
    });
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  return res.status(200).json(req.user);
};