import { Request, Response, NextFunction } from "express";
import RegisterUserService from "../services/RegisterUserService";

class CreateUser {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { tempId, first_name, last_name, password,} = req.body;

      const registerUserService = new RegisterUserService();

      const createUser = await registerUserService.execute({
        tempId,
        first_name,
        last_name,
        password,
      });

      return res.status(201).json({
        success: true,
        message: "User Successfully Created.",
        createUser,
      });
    } catch (error: any) {
      // next(error)
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default CreateUser;
