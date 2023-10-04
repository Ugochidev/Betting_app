import { Document, Schema, model } from 'mongoose';
import IUser from '../../dtos/IUserDTO';

const UserSchema: Schema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
    },
    referral_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export default interface IUserModel extends IUser, Document {}

export const User = model<IUserModel>('User', UserSchema);
