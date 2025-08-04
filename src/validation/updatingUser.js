import Joi from 'joi';

export const validationUpdatingUserData = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string!',
    'string.min': 'Minimum number of characters in a name is 3!',
    'string.max': 'The maximum number of characters in a name is 20!',
  }),
  email: Joi.string().min(3).max(30).messages({
    'string.base': 'Email must be a string!',
    'string.min': 'Minimum number of characters in email is 3!',
    'string.max': 'The maximum number of characters in an email is 30!',
  }),
  age: Joi.number().messages({
    'string.base': 'Age must be specified as a number!',
  }),
  weight: Joi.number().messages({
    'string.base': 'Weight is indicated as a number!',
  }),
  height: Joi.number().messages({
    'string.base': 'Height is indicated as a number!',
  }),
});
