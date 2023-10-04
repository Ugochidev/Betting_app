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
}

  export default WalletRepository