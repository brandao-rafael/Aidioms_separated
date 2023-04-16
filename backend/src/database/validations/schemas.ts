import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(8).max(30).required(),
  email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
  phone: Joi.string().length(11).required(),
  password: Joi.string().min(8),
  birth: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
  password: Joi.string().min(8).required(),
});

const classSchema = Joi.object({
  class_name: Joi.string().min(3).required(),
  user_id: Joi.number().required(),
  book: Joi.string().min(3).required(),
  unit: Joi.string().min(3).required(),
});

export {
  userSchema,
  loginSchema,
  classSchema,
};
