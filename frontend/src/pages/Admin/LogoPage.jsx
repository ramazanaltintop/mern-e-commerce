import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";

const LogoPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const logoId = "6654df2f5fc05f41d0acc9f6";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/logo/${logoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Logo başarılı bir şekilde güncellendi!...");
      } else {
        message.error("Logo güncelleme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Logo güncelleme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleLogo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/logo/${logoId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme başarısız oldu!...");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            name: data.name,
          });
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleLogo();
  }, [apiUrl, form]);

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Logo"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen logonuzu giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LogoPage;
