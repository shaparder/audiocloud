const Joi = require('@hapi/joi');

const registerValidation = data => {
	const userSchema = Joi.object({
    firstname:Joi.string().alphanum().min(2).max(30).required(),

    lastname:Joi.string().alphanum().min(2).max(30).required(),

		username: Joi.string().min(1).max(30).required(),

		email: Joi.string().email().min(5).max(60).required(),

		password: Joi.string().required().min(8).max(60).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
		.message('password must contain numbers, lowercase and uppercase characters and must be at least 8 characters long'),
	});
	return userSchema.validate(data, { abortEarly: false });
}

const loginValidation = data => {
	const userSchema = Joi.object({
		email: Joi.string().email().min(6).max(60).required(),

		password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),

	});
	return userSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
