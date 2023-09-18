import { Router } from "express";
import VerifyPhoneNumber from "../controllers/VerifyPhoneNumber.controller";
import CreateUser from "../controllers/CreateUser.controller";
import Login from "../controllers/LoginUser.controller";

import validatePhoneNumber from "../validators/phoneNumberValidator";
import verifyPhoneNumberValidator from "../validators/verifyPhoneNumberValidator";
import validateCreateUser from "../validators/userCreateValidator";
import loginValidator from "../validators/loginValidator";

const router = Router();
const verifyPhoneNumber = new VerifyPhoneNumber();
const createUser = new CreateUser();
const login = new Login()

router.post("/phoneNumber", validatePhoneNumber, verifyPhoneNumber.sendOtp);
router.post(
  "/verifyPhoneNumber",
  verifyPhoneNumberValidator,
  verifyPhoneNumber.verifyOtp
);
router.post("/", validateCreateUser, createUser.create);
router.post("/login", loginValidator, login.session);


export default router;