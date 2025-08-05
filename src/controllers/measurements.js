import createHttpError from 'http-errors';
import {
  addMeasurementTime,
  allSugarMeasurements,
  oneDay,
  oneMonth,
} from '../services/measurement.js';
import dateConversion from '../utils/dateConversion.js';

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
        state: 200,
        message: 'Data for the month',
        date: oneMonths,
      });
};
