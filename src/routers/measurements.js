import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  validationAddMeasurementSchema,
  validationOneDaySchema,
  validationOneMonthShema,
} from '../validation/measurement.js';
import {
  addMeasurementTimeController,
  allSugarMeasurementsController,
  oneDayController,
  oneMonthController,
} from '../controllers/measurements.js';

const router = Router();

router.post(
  '/add',
  authenticate,
  validateBody(validationAddMeasurementSchema),
  ctrlWrapper(addMeasurementTimeController),
);

router.get(
  '/all-dimensions',
  authenticate,
  ctrlWrapper(allSugarMeasurementsController),
);

router.get(
  '/in-one-day',
  authenticate,
  validateBody(validationOneDaySchema),
  ctrlWrapper(oneDayController),
);

router.get(
  '/in-one-month',
  authenticate,
  validateBody(validationOneMonthShema),
  ctrlWrapper(oneMonthController),
);

router.delete(
  '/delete-measurement',
  authenticate,

  ctrlWrapper(),
);

export default router;
