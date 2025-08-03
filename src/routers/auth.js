import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSсheme, registerUserSсheme } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

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
router.get('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;
