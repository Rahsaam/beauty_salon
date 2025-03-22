import React from "react";
import { Button, Modal } from "antd";
import PersianDate from "persian-date";
import dayjs from "dayjs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useAuth } from "@/context/AuthContext";

interface SetTurnModalProps {
  visible: boolean;
  onCancel: () => void;
}

const SetTurnModal: React.FC<SetTurnModalProps> = ({ visible, onCancel }) => {
  const { setCurrentStep, selectedDate, selectedAppointment } = useAuth();

  const formatPersianDate = (dateStr: string) => {
    const pd = new PersianDate(new Date(dateStr));
    return pd.format("D MMMM YYYY");
  };

  const goToDetailTurn = () => {
    if (selectedAppointment) {
      setCurrentStep("turnDetail");
    } else {
      console.warn("No appointment data available");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="detail"
          type="default"
          className="mx-auto text-center w-full"
          onClick={goToDetailTurn}
        >
          جزییات نوبت
        </Button>,
      ]}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#BEEBCC] p-2 rounded-full mb-4">
          <IoIosCheckmarkCircleOutline className="text-3xl" fill="#00691E" />
        </div>
        {selectedAppointment ? (
          <>
            <p>
              درخواست نوبت ({selectedAppointment.customer_name || "نام مشتری"}) با
              موفقیت ثبت شد.
            </p>
            <div className="mt-2">
              <span>
                تاریخ:{" "}
                {selectedAppointment.appointment_date
                  ? formatPersianDate(selectedAppointment.appointment_date)
                  : selectedDate
                  ? formatPersianDate(selectedDate)
                  : "نامشخص"}
              </span>
              {" - "}
              <span>
                ساعت:{" "}
                {selectedAppointment.appointment_time
                  ? dayjs(selectedAppointment.appointment_time, "HH:mm").isValid()
                    ? dayjs(selectedAppointment.appointment_time, "HH:mm").format("HH:mm")
                    : "نامشخص"
                  : "نامشخص"}
              </span>
            </div>
          </>
        ) : (
          <p>در حال بارگذاری اطلاعات...</p>
        )}
      </div>
    </Modal>
  );
};

export default SetTurnModal;