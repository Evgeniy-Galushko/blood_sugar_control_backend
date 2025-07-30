import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';
import { ONE_DAY } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 12);

  const accessToken = randomBytes(30).toString('base64');

  const newUser = await UsersCollection.create({
    ...payload,
    token: accessToken,
    password: encryptedPassword,
  });

  return await SessionCollection.create({
    name: newUser.name,
    email: newUser.email,
    userId: newUser._id,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
