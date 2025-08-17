import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';
import { THIRTY_DAYS } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 12);

  const accessToken = randomBytes(30).toString('base64');

  const newUser = await UsersCollection.create({
    ...payload,
    age: null,
    weight: null,
    height: null,
    bloodSugarNorm: null,
    gender: null,
    token: accessToken,
    password: encryptedPassword,
  });

  return await SessionCollection.create({
    name: newUser.name,
    email: newUser.email,
    userId: newUser._id,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const loginUser = async (payload) => {
  console.log(payload);
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const passwordMatching = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!passwordMatching) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    name: user.name,
    email: user.email,
    userId: user._id,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (token) => {
  const session = await SessionCollection.findOne({ accessToken: token });

  await SessionCollection.deleteOne({ _id: session._id });
};

export const userInformation = async (token) => {
  const session = await SessionCollection.findOne({ accessToken: token });

  const userId = session.userId;

  const user = await UsersCollection.findById(userId);

  return user;
};

export const updatingUserData = async (token, payload, options = {}) => {
  const session = await SessionCollection.findOne({ accessToken: token });
  const userId = session.userId;

  const updatedUser = await UsersCollection.findOneAndUpdate(userId, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!updatedUser || !updatedUser.value) return null;

  return {
    updatedUser: updatedUser.value,
    isNew: Boolean(updatedUser?.lastErrorObject.upserted),
  };
};
