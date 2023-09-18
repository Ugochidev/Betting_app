export default interface IResetPasswordDTO {
  phone_number: string,
  otp: string
  password: string;
  confirmPassword: string;
}
  