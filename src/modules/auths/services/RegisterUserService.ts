import UserRepository from "../../users/models/repositories/UserRepository";
import OtpRepository from "../../users/models/repositories/OtpRepository";
import ICreateUserDTO from "../../users/dtos/ICreateUserDTO";
import { generateReferralId, generateUsername } from "../../../shared/utils";
import AppError from "../../../shared/utils/AppError";
import Bcrypt from "../../../shared/services/Bcrypt";
import WalletRepository from "../../wallets/models/repositories/WalletRepository";
import { v4 } from "uuid";
import { Wallet } from '../../wallets/models/entities/Wallet';

class RegisterUserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;
  private bcrypt: Bcrypt;
  private walletRepository: WalletRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.bcrypt = new Bcrypt();
    this.otpRepository = new OtpRepository();
    this.walletRepository = new WalletRepository();
  }
  async execute({
    tempId,
    first_name,
    last_name,
    password,
  }: ICreateUserDTO): Promise<object> {
    const savedData = await this.otpRepository.findByTempId(tempId);

    if (!savedData) {
      throw new AppError("Invalid tempId...", 401);
    }

    const hashedPassword = await this.bcrypt.hash(password);

    let username = first_name.substring(0, 3) + generateUsername();

    let usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists) {
      do {
        username = first_name.substring(0, 3) + generateUsername();
        usernameExists = await this.userRepository.findByUsername(username);
      } while (usernameExists);

      return { username };
    }

    const referral_id = generateReferralId();

    const newUser = await this.userRepository.create({
      first_name,
      username,
      last_name,
      phone_number: savedData.user,
      password: hashedPassword,
      referral_id,
    });

    const bet_id = v4(8);
    const wallet = await this.walletRepository.create({
      username,
      account_balance: "0",
      bet_id,
      my_bet: 0,
      user_id: newUser._id,
    });
    await this.otpRepository.deleteTempId(tempId);
    newUser.password = undefined;
    console.log(newUser);

    return {newUser, wallet};
  }
}
export default RegisterUserService;
