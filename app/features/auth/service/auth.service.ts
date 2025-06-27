import { env } from "../../../config/env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LeanUser, User } from "../../users/types/user.type";
import { UserModel } from "../../users/models/user.model";

export class AuthService {
    // signup
    static async register(data: {
        name: string;
        email: string;
        password: string;
        role?: "USER" | "ORGANIZER";
    }
) {
        const hash = await bcrypt.hash(data.password, 12);

        if (data.name?.trim() === '') delete (data as any).name;
        
        const user = await UserModel.create({ ...data, password: hash });

        const { _id, name, email, role } = user.toObject() as LeanUser;

        return { 
            user: 
                { 
                    id: _id.toString(), 
                    name, 
                    email, 
                    role 
                }};
    }

    // login
    static async login(
        email: string, 
        password: string
    ) {
        const user = await UserModel
            .findOne({ email })
            .select("+password")
            .lean<LeanUser>();
        if (!user) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error("Invalid credentials");

        return this.signToken(user);
    }

    // reset password
    static async resetPassword(email: string) {
        
    }

    private static signToken(user: LeanUser) {
        if (!env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from your .env!")
        }
       const token = jwt.sign(
            { sub: user._id, role: user.role },
            env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        const { _id, name, email, role } = user;
        console.log("user is: ", user)

        return { 
            user: { id: _id.toString(), name, email, role }, 
            token 
        };
    }
}