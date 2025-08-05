import { Router } from 'express';
import authRouter from '../routers/auth.js';
import measurementsRouter from '../routers/measurements.js';

const router = Router();

router.use('/user', authRouter);
router.use('/measurements', measurementsRouter);

export default router;
