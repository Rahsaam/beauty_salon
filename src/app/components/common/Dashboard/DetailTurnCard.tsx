import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  AiOutlineScissor,
  AiOutlineSearch,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import PersianDate from "persian-date";
import dayjs from "dayjs";
import { toFarsiDigits } from "@/helper/toFarsiDigits";

const DetailTurnCard = () => {
  const { selectedAppointment } = useAuth();
  const formatPersianDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    const pd = new PersianDate(new Date(dateStr));
    return pd.format("D MMMM YYYY");
  };

  const appointmentTitle = selectedAppointment?.service_type;
  const appointmentSubtitle = selectedAppointment?.customer_name;
  const appointmentDate = selectedAppointment?.appointment_date
  ? formatPersianDate(selectedAppointment.appointment_date)
  : undefined;


  // const appointmentDay = selectedAppointment?.day_of_week
  const appointmentTime = selectedAppointment?.appointment_time
    ? dayjs(selectedAppointment.appointment_time, "HH:mm").isValid()
      ? dayjs(selectedAppointment.appointment_time, "HH:mm").format("HH:mm")
      : "نامشخص"
    : "نامشخص";
  // const appointmentAddress = selectedAppointment?.address;
  const appointmentPhone = selectedAppointment?.customer_phone;

  return (
    <div className="border !border-[#EBE1E1] rounded-xl p-4 space-y-3">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AiOutlineScissor color="#6F0E37" className="text-xl" />
          <span>{appointmentTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineSearch color="#6F0E37" className="text-xl" />
          <span>{appointmentSubtitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineCalendar color="#6F0E37" className="text-xl" />
          <span>{appointmentDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineClockCircle color="#6F0E37" className="text-xl" />
          <span>{toFarsiDigits(appointmentTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlinePhone color="#6F0E37" className="text-xl" />
          <span>{toFarsiDigits(`${appointmentPhone}`)}</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <IoLocationOutline color="#6F0E37" className="text-xl"/>
          <span>{appointmentAddress}</span>
        </div> */}
      </div>

      <div>
        <Image
          src="/images/searchView.png"
          alt="Location Map"
          width={310}
          height={150}
          className="rounded-lg w-full"
        />
      </div>
    </div>
  );
};

export default DetailTurnCard;
