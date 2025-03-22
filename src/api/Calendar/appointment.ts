import { IAppointment } from "@/types/api";
import request from "..";


export const bookAppointment = async (appointmentData: IAppointment) => {
  const response = await request.post(
    'https://teamim.org/beauty/api/appointments.php',
    appointmentData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};


export const getAppointments = async (professionalId: string | null) => {
    const response = await request.get('https://teamim.org/beauty/api/appointments.php', {
      params: { professional_id: professionalId },
      withCredentials: true,
    });
    return response.data;
  };