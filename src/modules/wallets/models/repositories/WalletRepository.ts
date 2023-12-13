import { Wallet } from "../entities/Wallet";
import IWalletModel from "../entities/Wallet";
import IWallet from "../../dtos/IWalletDTO";

class WalletRepository {
  private wallet;
  constructor() {
    this.wallet = Wallet;
  }

  async create(data: IWallet): Promise<IWalletModel> {
    const wallet = await this.wallet.create(data);
    return wallet;
  }
  async save(wallet: IWalletModel) {
    await wallet.save();
  }
  async findByUserId(user_id: string): Promise<IWalletModel | null> {
    const wallet = await this.wallet.findOne({ user_id });
    return wallet;
  }
}

export default WalletRepository;
