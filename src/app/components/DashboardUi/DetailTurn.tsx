import React from "react";
import DetailTurnCard from "../common/Dashboard/DetailTurnCard";
import { useAuth } from "@/context/AuthContext";

export default function DetailTurn() {
  const {selectedAppointment} = useAuth();

  console.log('selectedAppointment', selectedAppointment);
  
  return (
    <div className="mt-20">
      <DetailTurnCard />
    </div>
  );
}
