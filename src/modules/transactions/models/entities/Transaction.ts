import { Document, Schema, model } from "mongoose";
import ITransaction from "../../dtos/ITransactionDto";

const TransactionSchema: Schema = new Schema<ITransaction>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["Deposit", "Withdrawal"],
    },
    amount: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.methods.toJSON = function () {
  const transaction = this.toObject();
  delete transaction.__v;
  return transaction;
};

export default interface ITransactionModel extends ITransaction, Document {}

export const Transaction = model<ITransactionModel>("Transaction", TransactionSchema);