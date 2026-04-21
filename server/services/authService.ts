import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";
import {
    RegisterUserInput,
    LoginUserInput,
    AuthResponse
} from "../types/auth.types";

export const registerUserService = async (
    payload: RegisterUserInput
): Promise<AuthResponse> => {
    const { name, email, password } = payload;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString())
    };
};

export const loginUserService = async (
    payload: LoginUserInput
): Promise<AuthResponse> => {
    const { email, password } = payload;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    user.lastLoginAt = new Date();
    await user.save();

    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString())
    };
};

export const getCurrentUserService = async (userId: string) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};