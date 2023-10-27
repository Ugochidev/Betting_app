import { Transaction } from '../entities/Transaction';
import ITransaction from "../../dtos/ITransactionDto";
import ITransactionModel from "../entities/Transaction";

 class TransactionRepository {
   private transaction;
   constructor() {
     this.transaction = Transaction;
   }

   async create(data: ITransaction): Promise<ITransactionModel> {
     const transaction = await this.transaction.create(data);
     return transaction;
   }
 }