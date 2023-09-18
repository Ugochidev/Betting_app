import { User } from "../entities/User";
import IUserModel from "../entities/User";
import IUser from "../../dtos/IUserDTO";

class UserRepository {
  private user;
  constructor() {
    this.user = User;
  }

  async create(data: IUser): Promise<IUserModel> {
    const user = await this.user.create(data);
    return user;
  }

  async findByPhoneNumber(phone_number: string): Promise<IUserModel | null> {
    const user = await this.user.findOne({ phone_number });
    return user;
  }


  async save(user: IUserModel) {
    await user.save();
  }

  async findById(id: string): Promise<IUserModel | null> {
    const user = await this.user.findById(id);
    
    return user;
  }

  async update(id: string, data: object): Promise<IUserModel | null> {
    const user = await this.user.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async deleteById(id: string): Promise<IUserModel | null> {
    const user = await this.user.findByIdAndDelete(id);
    return user;
  }

  async deleteByPhoneNumber(phone_number: string): Promise<IUserModel | null> {
    const user = await this.user.findOneAndDelete({ phone_number });
    return user;
  }
}

export default UserRepository;
