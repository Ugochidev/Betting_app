import Bcrypt from "../../../shared/services/Bcrypt"
import AppError from "../../../shared/utils/AppError";
import IChangePasswordDTO from "../../users/dtos/IChangePasswordDTO";
import UserRepository from "../../users/models/repositories/UserRepository";

class ChangePasswordService {
  private userRepository: UserRepository;
  private bcrypt: Bcrypt;

  constructor() {
    this.userRepository = new UserRepository();
    this.bcrypt = new Bcrypt();
  }

  public async execute({
    id,
    old_password,
    new_password,
  }: IChangePasswordDTO): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const passwordMatched = await this.bcrypt.compare(old_password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect password.", 400);
    }

    user.password = await this.bcrypt.hash(new_password);

    await this.userRepository.save(user);
    return;
  }
}

export default ChangePasswordService;
