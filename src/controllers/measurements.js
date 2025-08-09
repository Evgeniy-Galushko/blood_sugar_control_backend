import createHttpError from 'http-errors';
import {
  addMeasurementTime,
  allSugarMeasurements,
  deleteMeasurement,
  oneDay,
  oneMonth,
  sixMonths,
} from '../services/measurement.js';
import { dateConversion, inSixMonths } from '../utils/dateConversion.js';

export const addMeasurementTimeController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  const addMeasurement = await addMeasurementTime(token, req.body);

  res.status(201).json({
    status: 201,
    message: 'Blood sugar level added',
    data: addMeasurement,
  });
};

export const allSugarMeasurementsController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const allSugarMeasurement = await allSugarMeasurements(token);

  console.log(allSugarMeasurement.length);
  allSugarMeasurement.length === 0
    ? res.json({
        status: 200,
        message: 'You have no entries.',
        data: allSugarMeasurement,
      })
    : res.json({
        status: 200,
        message: 'List of all sugar measurements!',
        data: allSugarMeasurement,
      });
};

export const oneDayController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const date = req.query.day;
  const oneDays = await oneDay(token, date);

  oneDays.length === 0
    ? res.json({
        status: 200,
        message: 'There are no entries for this day!',
        data: oneDays,
      })
    : res.json({
        status: 200,
        message: 'Data for one day!',
        data: oneDays,
      });
};

export const oneMonthController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const month = req.query.month;

  if (month.length < 7 || month.length > 7) {
    throw createHttpError(
      404,
      'Incorrect date! Date must match this format "2025-03"!',
    );
  }

  const period = dateConversion(month);
  const beginning = period.beginningOfPeriod;
  const end = period.endOfPeriod;

  const oneMonths = await oneMonth(token, beginning, end);

  oneMonths.length === 0
    ? res.json({
        status: 200,
        message: 'There are no entries for this period!',
        data: oneMonths,
      })
    : res.json({
        status: 200,
        message: 'Data for the month',
        data: oneMonths,
      });
};

export const inSixMonthsController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const date = req.query.month;

  if (date.length < 10 || date.length > 10) {
    throw createHttpError(
      404,
      'Incorrect date! Date must match this format "2025-03-18"!',
    );
  }

  const period = inSixMonths(date);
  const beginning = period.beginningOfPeriod;
  const end = period.endOfPeriod;

  const dataSixMonths = await sixMonths(token, beginning, end);

  dataSixMonths.length === 0
    ? res.json({
        status: 200,
        message: 'There are no entries for this period!',
        data: dataSixMonths,
      })
    : res.json({
        status: 200,
        message: 'Data for six months!',
        data: dataSixMonths,
      });
};

export const deleteMeasurementController = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const { id } = req.params;

  const result = await deleteMeasurement(token, id);

  if (!result) {
    next(createHttpError(404, 'There is no such entry!'));
    return;
  }

  res.status(204).send();
};
