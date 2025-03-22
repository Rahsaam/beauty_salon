import request from "..";

const requestOtp = async ({ phone_number }: { phone_number: string }) => {
    return await request.post("https://teamim.org/beauty/api/request-otp.php", { phone_number });
  };

export default requestOtp;