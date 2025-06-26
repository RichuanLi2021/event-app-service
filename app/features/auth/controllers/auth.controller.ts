import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service";


// POST / – signup a account
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await AuthService.register(req.body);
    res.status(201).json(token);
  } catch (err) { next(err); }
}

// POST / – signin account
export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const token = await AuthService.login(email, password);
    res.json({token})
  } catch (err) { next(err); }
}

// POST / – reset password
export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    // to be done when sms is setup
  } catch (err) { next(err); }
}