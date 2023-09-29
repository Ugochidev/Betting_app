import { Request, Response } from "express";
import ChangePasswordService from "../services/ChangePasswordService";

class ChangePassword {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { old_password, new_password } = req.body;
      const id = req.user;

      const changePasswordService = new ChangePasswordService();
      await changePasswordService.execute({
        id,
        old_password,
        new_password,
      });

      return res.json({
        success: true,
        message: "Password Changed successful",
      });
    } catch (error: any) {
      console.log(error);

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
export default ChangePassword;
