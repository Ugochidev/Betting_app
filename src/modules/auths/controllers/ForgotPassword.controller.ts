import { Request, Response, NextFunction } from "express";
import ForgotPasswordService from "../services/ForgotPasswordService.services";

class ForgotPassword {
  async sendOtp(req: Request, res: Response): Promise<Response> {
    try {
      const { phone_number} = req.body;
      const forgotPasswordService = new ForgotPasswordService();
      const otp = await forgotPasswordService.execute({phone_number});
      return res.status(200).json({
        success: true,
        message: "otp sent",
        otp,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async verifyOtp(req: Request, res: Response): Promise<Response> {
    try {
      const { phone_number, otp, newPassword } = req.body;
      const forgotPasswordService = new ForgotPasswordService();
      await forgotPasswordService.execute2({ phone_number, otp, newPassword });
      return res.status(200).json({
        success: true,
        message: "password changed successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default ForgotPassword;
