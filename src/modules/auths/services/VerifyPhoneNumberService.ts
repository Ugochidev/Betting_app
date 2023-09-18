import UserRepository from "../../users/models/repositories/UserRepository";
// import Cache from "../../../shared/services/Redis";
import IPhoneNumberDTO from "../../users/dtos/IPhoneNumberDTO";
import OtpRepository from "../../users/models/repositories/OtpRepository";
import ITempIdDTO from "../../users/dtos/ITempIdDTO";
import IVerifyPhoneNumberDTO from "../../users/dtos/IVerifyPhoneNumberDTO";
import AppError from "../../../shared/utils/AppError";
import { generateOTP } from "../../../shared/utils";
import { v4 } from "uuid";

class VerifyPhoneNumberService {
  private userRepository: UserRepository;
  // private cache: Cache;
  private otpRepository: OtpRepository;

  constructor() {
    this.userRepository = new UserRepository();
    // this.cache = new Cache();
    this.otpRepository = new OtpRepository();
  }

  async execute({ phone_number }: IPhoneNumberDTO): Promise<{ otp: string }> {
    try {
      const userExists = await this.userRepository.findByPhoneNumber(
        phone_number
      );

      if (userExists) {
        throw new AppError("Phone Number Exists!", 401);
      }
      await this.otpRepository.deleteByUser(phone_number);

      const verificationOtpExists = await this.otpRepository.findByPhoneNumber(
        phone_number
      );

      if (
        verificationOtpExists &&
        verificationOtpExists.for == "PHONE_NUMBER_VERIFICATION"
      ) {
        verificationOtpExists.otp = generateOTP();
        await this.otpRepository.save(verificationOtpExists);
        return { otp: verificationOtpExists.otp };
      }

      const otp = generateOTP();

      const payload = {
        user: phone_number,
        data: {
          phone_number,
          phoneNumberVerified: false,
        },
        otp,
      };

      await this.otpRepository.create(payload);

      return { otp };
    } catch (error: any) {
      console.log(error);
      throw new AppError(error);
    }
  }

  async execute2({
    phone_number,
    otp,
  }: IVerifyPhoneNumberDTO): Promise<ITempIdDTO> {
    const userExists = await this.userRepository.findByPhoneNumber(
      phone_number
    );

    if (userExists) {
      throw new AppError("Phone Number Exists!", 401);
    }
    const verificationOtpExists = await this.otpRepository.findByPhoneNumber(
      phone_number
    );
    console.log(verificationOtpExists);

    if (!verificationOtpExists) {
      throw new AppError("Phone Number not found for verification!", 404);
    }

    if (
      verificationOtpExists.otp !== otp ||
      Date.now() > verificationOtpExists.expiresIn
    ) {
      throw new AppError("OTP Invalid or expired...", 401);
    }

    verificationOtpExists.data = {
      phone_number,
      phoneNumberVerified: true,
    };
    const tempId = v4();

    await this.otpRepository.update(verificationOtpExists._id, {
      data: verificationOtpExists.data,
      tempId,
    });

    return { tempId };
  }
}

export default VerifyPhoneNumberService;
