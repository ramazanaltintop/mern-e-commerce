import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";

const CreateSlidePage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slides`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Slayt başarılı bir şekilde oluşturuldu!...");
        form.resetFields();
      } else {
        message.error("Slayt oluşturma işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Slayt oluşturma hatası", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Slayt Adı"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen slayt adını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slayt Resmi (Bağlantı)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen ilgili slaytın resim bağlantısını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateSlidePage;
