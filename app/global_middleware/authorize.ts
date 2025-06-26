import { Request, Response, NextFunction, RequestHandler } from "express";

const allowedRoles = ['USER', 'ORGANIZER', 'ADMIN'] as const;
export type Role = typeof allowedRoles[number];

export function authorize(...roles: Role[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    if (!roles.includes(req.user.role as Role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
}