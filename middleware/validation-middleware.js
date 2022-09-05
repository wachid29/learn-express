const Joi = require("joi");

const register = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone_number: Joi.string()
      .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "phone number must be number and start with +62/62/0 followed by 8,then min 9, max 14 lenght of number",
      }),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    confirm_pass: Joi.ref("password"),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    res.status(400).send(message);
  } else {
    next();
  }
};

const login = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(6).max(50).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(", ");
    res.status(400).send(message);
  } else {
    next();
  }
};

const addRecipe = (req, res, next) => {
  const schema = Joi.object().keys({
    title_recipe: Joi.string().min(3).max(50).required(),
    image: Joi.optional(),
    ingredients: Joi.string().min(3).max(220).required(),
    vidio_step: Joi.string().min(3).max(220).required(),
    user_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(", ");
    res.status(400).send(message);
  } else {
    next();
  }
};

module.exports = { register, login, addRecipe };
