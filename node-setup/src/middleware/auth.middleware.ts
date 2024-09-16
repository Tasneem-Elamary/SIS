import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../util/auth.util';

interface TokenUser extends JwtPayload {
  id: string;
  role: 'university admin' | 'faculty admin' | 'professor' | 'teaching assistant' | 'student'; // your roles
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}

// authentication
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const [authType, authToken] = authHeader.split(' ');

    if (authType.toLowerCase() !== 'bearer' || !authToken) {
      return res.status(401).json({ message: 'Invalid authentication type or token' });
    }

    const user = verifyToken(authToken) as TokenUser;
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized: Please log in', error });
  }
};

// authorization
const authorizeRoles = (...allowedRoles: TokenUser['role'][]) => (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;

  if (!user) {
    return res.status(403).json({ message: 'Forbidden: No user found' });
  }

  if (!allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: 'Forbidden: You don\'t have permission to access this resource' });
  }

  next();
};

export { isAuth, authorizeRoles };
