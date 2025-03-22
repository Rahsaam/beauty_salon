import { FormInstance } from 'antd';
import { UseMutationResult } from '@tanstack/react-query';
import dayjs from 'dayjs'

interface ISelectOptions {
  label: string;
  value: string;
}

export interface IServiceBox {
  title: string;
  description?: string;
  rule: string;
  options: ISelectOptions[];
  placeholder: string;
  selectValue: string;
  setSelectValue: (value: string) => void;
  isSecondInput: boolean;
  secondPlaceHolder?: string;
  secondInputValue?: string;
  setSecondInputValue?: (value: string) => void;
}

export interface IServiceCard {
  title: string;
  description: string;
  onAdd: () => void;
}

export interface IInputBox {
  title: string;
  description?: string;
  rule: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export interface IDetailTurnCardProps {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  address: string;
  phone: string;
}


interface AppointmentFormValues {
  customer_name: string;
  customer_phone: string;
  service_type: string;
  appointment_time: string;
  address: string;
  notes?: string;
}


export interface ManualAppointmentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  form: FormInstance<AppointmentFormValues>;
  handleBooking: (values: AppointmentFormValues) => void;
  bookAppointmentMutation: UseMutationResult<
    AppointmentFormValues,
    unknown,             
    AppointmentFormValues,
    unknown
  >;
}

export interface IBookingFormValues {
  customer_name: string;
  customer_phone: string;
  service_type: string;
  appointment_time: dayjs.Dayjs;
  address: string;
}