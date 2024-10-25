import { Request, Response } from 'express';
import { db } from '../../db';
import { usersTable } from '../../db/usersSchema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    const { password, ...cleanUser } = user;

    res.status(201).json(cleanUser);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      'simple-secret',
      { expiresIn: '30d' }
    );

    const { password: removedPassword, ...cleanUser } = user;
    res.status(200).json({ token, ...cleanUser });
  } catch (e) {
    res.status(500).send(e);
  }
}
