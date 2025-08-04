import {
  loginUser,
  logoutUser,
  registerUser,
  updatingUserData,
  userInformation,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  // console.log(user);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  // console.log(req.body);
  const session = await loginUser(req.body);

  // console.log(session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      name: session.name,
      email: session.email,
      accessToken: session.accessToken,
      userId: session.userId,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    await logoutUser(token);
  }
  res.status(204).send();
};

export const userInformationController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = await userInformation(token);

  // console.log(user);

  res.json({
    status: 200,
    message: 'User data',
    data: {
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
      userId: user._id,
    },
  });
};

export const updatingUserDataController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const updatedUser = await updatingUserData(token, req.body, { upsert: true });

  // console.log(updatedUser);

  res.json({
    status: 200,
    message: 'User data has been updated!',
    data: {},
  });
};
