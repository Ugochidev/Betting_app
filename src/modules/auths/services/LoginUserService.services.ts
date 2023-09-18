import ILoginDTO from "../../users/dtos/ILoginDTO";
import UserRepository from "../../users/models/repositories/UserRepository";
import AppError from "../../../shared/utils/AppError";
import Bcrypt from "../../../shared/services/Bcrypt";
import Jwt from "../../../shared/services/JWT";
// import { generateOTP } from "../../../shared/utils";
import OtpRepository from "../../users/models/repositories/OtpRepository";
import ICreateSessionDTO from "../../users/dtos/ICreateSessionDTO"
// import { Otp } from "../models/entities/Otp";

class LoginUserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;
  private bcrypt: Bcrypt;
  private jwt: Jwt;

  constructor() {
    this.userRepository = new UserRepository();
    this.otpRepository = new OtpRepository();
    this.bcrypt = new Bcrypt();
    this.jwt = new Jwt();
  }

  async execute({
    phone_number,
    password,
  }: ILoginDTO): Promise<ICreateSessionDTO> {
    const user = await this.userRepository.findByPhoneNumber(phone_number);

    if (!user) {
      throw new AppError("Incorrect Login Credentials", 404);
    }

    const passwordMatch = await this.bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect Login Credentials", 401);
    }

    const access_token = await this.jwt.generateAccessToken({
      _id: user._id,
    });
    return { access_token };
  }
}

export default LoginUserService;
