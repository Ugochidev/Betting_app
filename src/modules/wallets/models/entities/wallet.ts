import { Document, Schema, model } from "mongoose";
import IWallet from "../../dtos/IWalletDTO";

const WalletSchema: Schema = new Schema<IWallet>(
  {
    username: {
      type: String,
      required: true,
    },
    account_balance: {
      type: String,
      required: true,
      default: "0",
    },
    bet_id: {
      type: String,
      required: true,
      unique: true,
    },
    my_bet: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default interface IWalletModel extends IWallet, Document {}

export const Wallet = model<IWalletModel>("Wallet", WalletSchema);
