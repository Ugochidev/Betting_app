import { celebrate, Joi, Segments } from "celebrate";
export default celebrate({
  [Segments.BODY]: {
    phone_number: Joi.string(),
    otp: Joi.string(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required(),
  },
});
