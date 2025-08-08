import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSсheme, registerUserSсheme } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  updatingUserDataController,
  userInformationController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validationUpdatingUserData } from '../validation/updatingUser.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSсheme),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSсheme),
  ctrlWrapper(loginUserController),
);
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));
router.get(
  '/userInformation',
  authenticate,
  ctrlWrapper(userInformationController),
);

router.put(
  '/updating',
  authenticate,
  validateBody(validationUpdatingUserData),
  ctrlWrapper(updatingUserDataController),
);

export default router;
