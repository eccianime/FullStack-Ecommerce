import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Access Denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'simple-secret');
    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(401).json({ error: 'Access Denied' });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Access Denied' });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  try {
    if (role !== 'seller') {
      res
        .status(401)
        .json({ error: "Access denied. You don't have seller access." });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Access Denied' });
  }
}
