import WalletRepository from "../models/repositories/WalletRepository";
import ITransactionPin from "../dtos/ITransactionPinDTO";
import AppError from "../../../shared/utils/AppError";
import Bcrypt from "../../../shared/services/Bcrypt";



class CreateTransactionPinService {
  private walletRepository: WalletRepository;
  private bcrypt: Bcrypt;
  constructor() {
    this.walletRepository = new WalletRepository();
    this.bcrypt = new Bcrypt();
  }
  async execute({
    user_id,
    transaction_pin,
  }: ITransactionPin): Promise<object> {
    const wallet = await this.walletRepository.findByUserId(user_id);
    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    if (wallet.transaction_pin) {
      throw new AppError("Pin Created Already...", 401);
    }

    const hashedPin = await this.bcrypt.hash(transaction_pin);
    wallet.transaction_pin = hashedPin;
    await this.walletRepository.save(wallet);
    return;
  }
}


export default CreateTransactionPinService;