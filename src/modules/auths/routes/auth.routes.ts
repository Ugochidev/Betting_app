import { Router } from "express";
import VerifyPhoneNumber from "../controllers/VerifyPhoneNumber.controller";
import CreateUser from "../controllers/CreateUser.controller";
import Login from "../controllers/LoginUser.controller";
import ChangePassword from "../controllers/ChangePassword.controller";
import ForgotPassword from "../controllers/ForgotPassword.controller";

import validatePhoneNumber from "../validators/phoneNumberValidator";
import verifyPhoneNumberValidator from "../validators/verifyPhoneNumberValidator";
import validateCreateUser from "../validators/userCreateValidator";
import loginValidator from "../validators/loginValidator";
import changePasswordValidator from "../validators/changePasswordValidator";
import resetPasswordValidator from "../validators/resetPasswordValidator";

import auth from "../../../shared/middlewares/auth";

const router = Router();
const verifyPhoneNumber = new VerifyPhoneNumber();
const createUser = new CreateUser();
const login = new Login();
const changePassword = new ChangePassword();
const forgotPassword = new ForgotPassword();

router.post("/phoneNumber", validatePhoneNumber, verifyPhoneNumber.sendOtp);
router.post(
  "/verifyPhoneNumber",
  verifyPhoneNumberValidator,
  verifyPhoneNumber.verifyOtp
);
router.post("/", validateCreateUser, createUser.create);
router.post("/login", loginValidator, login.session);
router.patch(
  "/changePassword",
  auth,
  changePasswordValidator,
  changePassword.update
);
router.post("/forgotPassword", validatePhoneNumber, forgotPassword.sendOtp);
router.patch(
  "/resetPassword",
  resetPasswordValidator,
  forgotPassword.verifyOtp
);

export default router;
