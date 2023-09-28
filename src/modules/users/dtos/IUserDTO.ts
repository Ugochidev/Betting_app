// import { AnyARecord } from "dns";

export default interface IUser {
  _id?: any;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  password: string;
  referral_id: string;
  avatar?: string;
}
