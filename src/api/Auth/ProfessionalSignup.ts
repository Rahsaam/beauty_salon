// app/api/professionalSignup.ts
import request from "..";

const professionalSignup = async () => {
  const response = await request.post("https://teamim.org/beauty/api/professional-signup.php");
  return response.data;
};

export default professionalSignup;
