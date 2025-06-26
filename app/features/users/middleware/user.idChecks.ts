import { Request, Response, NextFunction } from 'express';

export function allowSelfOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
    // admin has access to user profile temporary
  if (req.user?.role === 'ADMIN' || req.user?.id === req.params.id) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
}