export default interface IOtpDTO {
  user?: string;
  otp: string;
  for?: string;
  data?: {
    phone_number?: string;
    phoneNumberVerified?: boolean;
  };
  createdAt?: any;
  expiresAt?: any;
}
