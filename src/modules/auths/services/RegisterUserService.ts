import UserRepository from "../../users/models/repositories/UserRepository";
import OtpRepository from "../../users/models/repositories/OtpRepository";
import ICreateUserDTO from "../../users/dtos/ICreateUserDTO";
import IPhoneNumberDTO from "../../users/dtos/IPhoneNumberDTO";
import AppError from "../../../shared/utils/AppError";
import Bcrypt from "../../../shared/services/Bcrypt";

class RegisterUserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;
  private bcrypt: Bcrypt;
  constructor() {
    this.userRepository = new UserRepository();
    this.bcrypt = new Bcrypt();
    this.otpRepository = new OtpRepository();
  }
  async execute({
    tempId,
    first_name,
    last_name,
    password,
  }: ICreateUserDTO): Promise<IPhoneNumberDTO> {
    const savedData = await this.otpRepository.findByTempId(tempId)

    console.log(savedData);

    if (!savedData) {
      throw new AppError("Invalid tempId...", 401);
    }

    const hashedPassword = await this.bcrypt.hash(password);
const username = 
    const newUser = await this.userRepository.create({
      first_name,
      username,
      last_name,
      phone_number: savedData.user,
      password: hashedPassword,
    });

    await this.otpRepository.deleteTempId(tempId);

    return { phone_number: savedData.user };
  }
}
export default RegisterUserService;
