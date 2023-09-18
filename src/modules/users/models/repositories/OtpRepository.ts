import { Otp } from "../entities/Otp";
import IOtpModel from "../entities/Otp";


class OtpRepository {
  private otp;
  constructor() {
    this.otp = Otp;
  }

  async create(data: {
    user?: string;
    otp: string;
    data?: object;
  }): Promise<IOtpModel> {
    const otp = await this.otp.create(data);
    return otp;
  }

  async findByPhoneNumber(phone_number: string): Promise<IOtpModel | null> {
    let payload: any = {
      user: phone_number,
    };
    const otp = await this.otp.findOne(payload);
    return otp;
  }

  async findByUserId(id: string): Promise<IOtpModel | null> {
    const otp = await this.otp.findOne({ user: id });
    return otp;
  }

  async save(user: IOtpModel) {
    await user.save();
  }

  async findById(id: string): Promise<IOtpModel | null> {
    const otp = await this.otp.findById(id);
    return otp;
  }

  async findByTempId(tempId: string): Promise<IOtpModel | null> {
    const otp = await this.otp.findOne({ tempId });
    return otp;
  }

  async update(id: string, data: object): Promise<IOtpModel | null> {
    const otp = await this.otp.findByIdAndUpdate(id, data, { new: true });
    return otp;
  }

  async delete(id: string): Promise<IOtpModel | null> {
    const otp = await this.otp.findByIdAndDelete(id);
    return otp;
  }

  async deleteByUser(user: string): Promise<IOtpModel | null> {
    const otp = await this.otp.findOneAndDelete({ user });
    return otp;
  }

  async deleteUserOtp(user: string): Promise<null> {
    const otp = await this.otp.deleteMany({ user });
    console.log("otp,", otp);

    return null;
  }

  async deleteTempId(tempId: string): Promise<null> {
    await this.otp.deleteMany({ tempId });

    return null;
  }
}

export default OtpRepository;