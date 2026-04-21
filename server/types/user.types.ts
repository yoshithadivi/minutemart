import { Types } from "mongoose";

export type UserRole = "customer" | "admin";

export interface IAddress {
    label: "Home" | "Work" | "Other";
    fullName: string;
    phone: string;
    house: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

export interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
    priceSnapshot: number;
    nameSnapshot: string;
    imageSnapshot?: string;
    unitSnapshot?: string;
    addedAt: Date;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: UserRole;
    addresses: IAddress[];
    cart: ICartItem[];
    isActive: boolean;
    lastLoginAt?: Date;
}

export interface IUserMethods {
    matchPassword(
        enteredPassword: string
    ): Promise<boolean>;
}