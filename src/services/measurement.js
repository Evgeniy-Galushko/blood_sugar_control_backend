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

  // const month = Object.values(
  //   oneMonths.reduce((month, item) => {
  //     const day = new Date(item.date).getDate();
  //     if (!month[day]) {
  //       month[day] = { day, sum: 0, count: 0 };
  //     }
  //     const value = item.onAnEmptyStomach ?? item.afterEating ?? 0;
  //     month[day].sum += value;
  //     month[day].count += 1;
  //     return month;
  //   }, {}),
  // ).map(({ day, sum, count }) => ({
  //   day,
  //   averageDailyRate: (sum / count).toFixed(2),
  // }));

  const month = Object.values(
    oneMonths.reduce((month, item) => {
      const day = new Date(item.date).getDate();
      if (!month[day]) {
        month[day] = {
          day,
          sumAnEmpty: 0,
          countAnEmpty: 0,
          sumafter: 0,
          counafter: 0,
        };
      }
      // const value = item.onAnEmptyStomach ?? item.afterEating ?? 0;
      if (item.onAnEmptyStomach != null) {
        month[day].sumAnEmpty += item.onAnEmptyStomach;
        month[day].countAnEmpty += 1;
      }

      if (item.afterEating != null) {
        month[day].sumafter += item.afterEating;
        month[day].counafter += 1;
      }

      return month;
    }, {}),
  ).map(({ day, sumAnEmpty, countAnEmpty, sumafter, counafter }) => ({
    day,
    onAnEmptyStomach: (sumAnEmpty / countAnEmpty).toFixed(2),
    afterEating: (sumafter / counafter).toFixed(2),
  }));

  return month;
};

export const sixMonths = async (token, beginning, end) => {
  const session = await SessionCollection.findOne({ accessToken: token });
  // console.log(typeof beginning);
  const sixMonths = await OneSugarMeasurementCollection.find({
    userId: session.userId,
  })
    .where('date')
    .gte(end)
    .lte(beginning);
  // console.log(sixMonths.length);

  return sixMonths;
};

export const deleteMeasurement = async (token, id) => {
  const session = await SessionCollection.findOne({ accessToken: token });

  const oneMeasurement = await OneSugarMeasurementCollection.findOneAndDelete({
    userId: session.userId,
    _id: id,
  });

  return oneMeasurement;
};
