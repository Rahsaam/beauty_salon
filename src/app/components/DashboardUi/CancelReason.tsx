import React, { useState } from "react";
import { Card, Radio, Typography } from "antd";

const { Text } = Typography;

const CancelReason = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const reasons = ["توضیحات دلیل ۱", "توضیحات دلیل ۲", "توضیحات دلیل ۳"];

  return (
    <Card className="border border-[#EBE1E1] !mt-20">
      <div className="flex flex-col">
        <Text strong>لطفاً دلیل لغو نوبتت رو انتخاب کن:</Text>
        <Radio.Group
          onChange={(e) => setSelectedReason(e.target.value)}
          value={selectedReason}
          className="!mt-3"
        >
          <div className="flex flex-col">
            {reasons.map((reason, index) => (
              <Radio key={index} value={reason} className="!pt-2">
                {reason}
              </Radio>
            ))}
          </div>
        </Radio.Group>
      </div>
    </Card>
  );
};

export default CancelReason;
