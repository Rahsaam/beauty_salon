import request from "..";

const requestOtp = async ({ phone_number }: { phone_number: string }) => {
    return await request.post("request-otp.php", { phone_number });
  };

export default requestOtp;