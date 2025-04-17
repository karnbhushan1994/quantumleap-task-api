import Joi from 'joi';

// This schema is used to validate the task data before it is sent to the database
// It ensures that the title is a string, status is either 'pending' or 'done', and dueDate is a date in the future
export const taskValidationSchema = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().valid('pending', 'done').required(),
  dueDate: Joi.date().min('now').required()
});
