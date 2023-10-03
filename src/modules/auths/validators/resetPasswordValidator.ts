import { celebrate, Joi, Segments } from "celebrate";
export default celebrate({
  [Segments.BODY]: {
    phone_number: Joi.string(),
    otp: Joi.string(),
    newPassword: Joi.string().min(8).required(),

  },
});
