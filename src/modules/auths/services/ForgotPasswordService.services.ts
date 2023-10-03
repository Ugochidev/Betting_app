import UserRepository from "../../users/models/repositories/UserRepository";
import OtpRepository from "../../users/models/repositories/OtpRepository";
import IPhoneNumberDTO from "../../users/dtos/IPhoneNumberDTO";
import { generateOTP } from "../../../shared/utils";
import AppError from "../../../shared/utils/AppError";
import IResetPasswordDTO from "../../users/dtos/IResetPasswordDTO";
import Bcrypt from "../../../shared/services/Bcrypt";


class ForgotPasswordService {
  private userRepository: UserRepository;
  private bcrypt: Bcrypt;
  private otpRepository: OtpRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.otpRepository = new OtpRepository();
    this.bcrypt = new Bcrypt();
  }
  async execute({ phone_number }: IPhoneNumberDTO): Promise<{ otp: string }> {
    const phoneNumberExists = await this.userRepository.findByPhoneNumber(
      phone_number
    );
    console.log(phoneNumberExists);

    if (!phoneNumberExists) {
      throw new AppError("User not found", 404);
    }

    const otpExists = await this.otpRepository.findByPhoneNumber(phone_number);
    console.log(otpExists);

    if (otpExists) {
      const otp = otpExists.otp;
      return { otp };
    }
    const otp = generateOTP();

    const payload = {
      user: phone_number,
      otp,
    };
    await this.otpRepository.create(payload);

    return { otp };
  }

  async execute2({
    otp,
    phone_number,
    newPassword,
  }: IResetPasswordDTO): Promise<void> {
    const phonenumberExists = await this.userRepository.findByPhoneNumber(
      phone_number
    );
    if (!phonenumberExists) {
      throw new AppError("User not found", 404);
    }
    const otpExists = await this.otpRepository.findByPhoneNumber(phone_number);

    if (!otpExists) {
      throw new AppError("not found", 404);
    }

    if (otpExists.otp !== otp) {
      throw new AppError("Invalid otp", 401);
    }
    const hashedPassword = await this.bcrypt.hash(newPassword);
    phonenumberExists.password = hashedPassword;
    
    await this.userRepository.save(phonenumberExists);
    await this.otpRepository.deleteByUser(phone_number)
    return;
  }
}

export default ForgotPasswordService;
