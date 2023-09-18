import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: {
    phone_number: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    otp: Joi.string().required(),
  },
});