import { Role } from './role';

export class Account {
    id?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string; // Added
    role?: Role;
    jwtToken?: string;
    dateCreated?: string;
    isVerified?: boolean;
    verificationToken?: string; // Addeds
    resetToken?: string; // Added
    resetTokenExpires?: string; // Added
    refreshTokens?: string[]; // Added
}