export interface IAppointment {
  professional_id?: string;
  customer_name: string;
  customer_phone: string;
  service_type: string;
  appointment_date: string | null;
  appointment_time: string;
  appointment_id?: string;
}

export interface IProfile {
    id: string;
    user_id: string;
    specializations: string;
    working_area: string;
    daily_schedule: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface IGetProfileResponse {
    success: boolean;
    profile: IProfile;
  }

  export type IGetAppointment = {
    appointment_date: string;
    appointment_time: string;
    created_at: string;
    customer_name: string;
    customer_phone: string;
    id: string;
    professional_id: string;
    service_type: string;
    status: "pending" | "completed" | "cancelled";
    updated_at?: string;
  };
