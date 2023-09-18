import { Document, Schema, model } from "mongoose";
import IOtp from "../../dtos/IOtp";

const OtpSchema: Schema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    tempId: {
      type: String,
    },
    data: {
      type: Object,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 60 * 15 * 1000,
    },
  },
  {
    timestamps: true,
  }
);

export default interface IOtpModel extends IOtp, Document {
  expiresIn: number;
}
export const Otp = model<IOtpModel>("OTP", OtpSchema);
