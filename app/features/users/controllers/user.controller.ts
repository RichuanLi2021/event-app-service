import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

// Users and Admin
export async function getUser(req: Request, res: Response): Promise<void> {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
}

// Admin only
export async function getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserModel.find();
    res.json(users);
}

export async function deleteSomeUsers(req: Request, res: Response): Promise<void> {
    const idsToDelete = req.body.ids;
    await UserModel.deleteMany({ _id: { $in: idsToDelete } });
    res.json({ deletedIds: idsToDelete });
}
