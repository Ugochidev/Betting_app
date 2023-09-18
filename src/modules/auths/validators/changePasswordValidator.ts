import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: {
    old_password: Joi.string().min(8).required(),
    new_password: Joi.string().min(8).required(),
  },
});
