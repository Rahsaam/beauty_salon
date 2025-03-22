import request from "..";

export const getAppointments = async (professionalId: number) => {
    const response = await request.get('https://teamim.org/beauty/api/appointments.php', {
      params: { professional_id: professionalId },
      withCredentials: true,
    });
    return response.data;
  };