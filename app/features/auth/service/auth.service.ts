import { env } from "../../../config/env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../users/types/user.type";
import { UserModel } from "../../users/models/user.model";

export class AuthService {
    // signup
    static async register(data: {
        email: string;
        password: string;
        role?: "USER" | "ORGANIZER";
    }
) {
        const hash = await bcrypt.hash(data.password, 12);
        const user = await UserModel.create({ ...data, password: hash });
        return this.signToken(user);
    }

    // login
    static async login(
        email: string, 
        password: string
    ) {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error("Invalid credentials");

        return this.signToken(user);
    }

    // reset password
    static async resetPassword(email: string) {
        
    }

    private static signToken(user: User) {
        return jwt.sign(
            { sub: user._id, role: user.role },
            env.JWT_SECRET,
            { expiresIn: "7d" }
        );
    }
}