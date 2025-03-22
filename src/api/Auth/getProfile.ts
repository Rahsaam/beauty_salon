import { IGetProfileResponse } from "@/types/api";
import request from "..";

const getProfile = async (): Promise<IGetProfileResponse> => {
  const response = await request.get("https://teamim.org/beauty/api/professional-profile.php");
  return response.data;
};

export default getProfile;