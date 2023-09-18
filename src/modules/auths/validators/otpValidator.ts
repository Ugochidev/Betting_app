import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: {
    otp: Joi.string().required(),
    email:Joi.string()
  },
});
