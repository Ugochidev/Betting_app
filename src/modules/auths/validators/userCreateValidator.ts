import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    tempId: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    referral_id: Joi.string(),
    phone_id: Joi.string(),
    // phone_id: Joi.string().required(),
    // device_token: Joi.string().required(),
    device_token: Joi.string(),
    email: Joi.string().required(),
  }),
});