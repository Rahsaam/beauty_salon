import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Empty from "@/app/components/common/Empty";
import { useAuth } from "@/context/AuthContext";

const { Title } = Typography;

const MyServices = () => {
    const {setCurrentStep} = useAuth()

    const handleSubmit = () => {
        setCurrentStep('newService')
    }
  return (
    <Card className="!mt-20">
      <Title level={5}>خدمات</Title>
      <span className="text-sm font-extralight">نام و هزینه خدمات قابل ارائه خود  را وارد کنید.</span>
      <Empty />
      <Button className=" w-full mt-6" icon={<PlusOutlined />} onClick={handleSubmit}>
        اضافه کردن خدمات جدید
      </Button>
    </Card>
  );
};

export default MyServices;



