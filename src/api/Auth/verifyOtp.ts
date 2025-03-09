import request from "..";

interface IVerifyOtp {
    phone_number: string,
    otp: string
}

const verifyOtp = async (data: IVerifyOtp) => {
    const response = await request.post('https://teamim.org/beauty/api/verify-otp.php', data);
    return response;
};

export default verifyOtp;