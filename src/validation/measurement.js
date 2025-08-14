import Joi from 'joi';

// export const validationAddMeasurementSchema = Joi.object({
//   date: Joi.string().min(8).max(12).required().messages({
//     'string.base': 'Day must be a string!',
//     'string.min': 'The minimum number of characters per day is 8!',
//     'string.max': 'The maximum number of characters in a day is 12!',
//   }),
//   time: Joi.string().min(2).max(8).required().messages({
//     'string.base': 'Time must be a string!',
//     'string.min': 'The minimum number of characters per time is 2!',
//     'string.max': 'The maximum number of characters in a eime is 8!',
//   }),
//   sugarLevel: Joi.number().required().messages({
//     'string.base': 'Sugar level must be a number!',
//   }),
//   measurementTime: Joi.string()
//     .valid('натощак', 'после еды')
//     .default('натощак')
//     .required()
//     .messages({
//       'string.base': 'Measurement time must be a string!',
//     }),
//   userId: Joi.string(),
// });

export const validationAddMeasurementSchema = Joi.object({
  date: Joi.string().min(8).max(12).required().messages({
    'string.base': 'Day must be a string!',
    'string.min': 'The minimum number of characters per day is 8!',
    'string.max': 'The maximum number of characters in a day is 12!',
  }),
  time: Joi.string().min(2).max(8).required().messages({
    'string.base': 'Time must be a string!',
    'string.min': 'The minimum number of characters per time is 2!',
    'string.max': 'The maximum number of characters in a eime is 8!',
  }),
  onAnEmptyStomach: Joi.number().messages({
    'string.base': 'Sugar level must be a number!',
  }),
  afterEating: Joi.number().messages({
    'string.base': 'Sugar level must be a number!',
  }),
  measurementTime: Joi.string()
    .valid('натощак', 'после еды')
    .default('натощак')
    .required()
    .messages({
      'string.base': 'Measurement time must be a string!',
    }),
  userId: Joi.string(),
});

export const validationOneDaySchema = Joi.object({
  day: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Day must be a string!',
    'string.min': 'Minimum number of characters in a day is 4!',
    'string.max': 'The maximum number of characters in a day is 12!',
  }),
});

export const validationOneMonthShema = Joi.object({
  month: Joi.string().min(4).max(12).required().messages({
    'string.base': 'BeginningOfTheMonth must be a string!',
    'string.min': 'Minimum number of characters in a beginningOfTheMonth is 8!',
    'string.max':
      'The maximum number of characters in a beginningOfTheMonth is 12!',
  }),
});
