import { Input, Button, message, App } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";

const CopyInput = () => {
  const [value] = useState("https://qtick.com/yourname");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    message.success("لینک کپی شد");
  };

  return (
    <App>
      <div style={{ display: "flex" }} className="mt-4">
        <Button
          type="primary"
          onClick={handleCopy}
          icon={<CopyOutlined />}
          style={{
            background: "#720D35",
            borderRadius: "0 8px 8px 0",
            color: "white",
          }}
        >
          کپی
        </Button>
        <Input
          value={value}
          readOnly
          style={{
            borderRadius: "8px 0 0 8px",
            textAlign: "left",
            color: "#6F0E37",
          }}
        />
      </div>
    </App>
  );
};

export default CopyInput;
