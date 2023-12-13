import { Request, Response } from "express";
import CreateTransactionPinService from "../services/CreateTransactionPin";

class CreateTransactionPin {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user;
      console.log(77, user_id);

      const { transaction_pin} = req.body;

      const createTransactionPinService = new CreateTransactionPinService();
      const response = await createTransactionPinService.execute({
        user_id,
        transaction_pin,
      });

      return res.json({
        success: true,
        message: "Pin Successfully Created...",
        response,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default CreateTransactionPin;
