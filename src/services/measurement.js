import { OneSugarMeasurementCollection } from '../db/models/oneSugarMeasurement.js';
import { SessionCollection } from '../db/models/session.js';

export const addMeasurementTime = async (token, peyload) => {
  const session = await SessionCollection.findOne({ accessToken: token });

  const measurementTime = await OneSugarMeasurementCollection.create({
    ...peyload,
    userId: session.userId,
  });

  return measurementTime;
};

export const allSugarMeasurements = async (token) => {
  const session = await SessionCollection.findOne({ accessToken: token });

  const allMeasurements = await OneSugarMeasurementCollection.find({
    userId: session.userId,
  });

  return allMeasurements;
};

export const oneDay = async (token, date) => {
  const session = await SessionCollection.findOne({ accessToken: token });
  // console.log(session.userId);

  const oneDay = await OneSugarMeasurementCollection.find({
    userId: session.userId,
    date: { $eq: date },
  });

  return oneDay;
};

export const oneMonth = async (token, beginning, end) => {
  const session = await SessionCollection.findOne({ accessToken: token });
  const oneMonths = await OneSugarMeasurementCollection.find({
    userId: session.userId,
  })
    .where('date')
    .gte(beginning)
    .lte(end);

  return oneMonths;
};
