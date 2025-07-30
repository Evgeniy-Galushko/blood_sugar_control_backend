import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSсheme } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSсheme),
  ctrlWrapper(registerUserController),
);
// router.post('/login');
// router.post('/logout');

export default router;
