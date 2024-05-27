import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";

const AdminContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const contactId = "6654e24c83cf6366bd6bc110";
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleContact = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/contact/${contactId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme başarısız oldu!...");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            iframe: data.iframe,
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            shopTitle: data.shopTitle,
            street: data.street,
            phone: data.phone,
            email: data.email,
            date: data.date,
          });
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleContact();
  }, [apiUrl, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/contact/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(
          "İletişim sayfası başarılı bir şekilde güncellendi!..."
        );
      } else {
        message.error("İletişim sayfası güncelleme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("İletişim sayfası güncelleme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="IFrame Kodu"
          name="iframe"
          rules={[
            {
              required: true,
              message: "Lütfen iframe kodunu giriniz!...",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Lütfen iframe kodunu giriniz!..."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Başlık"
          name="title"
          rules={[
            {
              required: true,
              message: "Lütfen iletişim sayfasının başlığını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Alt Başlık"
          name="subTitle"
          rules={[
            {
              required: true,
              message: "Lütfen iletişim sayfasının alt başlığını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Açıklama"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen iletişim sayfası için bir açıklama giriniz!...",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Lütfen iletişim sayfası için bir açıklama giriniz!..."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Mağaza Adı"
          name="shopTitle"
          rules={[
            {
              required: true,
              message: "Lütfen bir mağaza adı giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sokak"
          name="street"
          rules={[
            {
              required: true,
              message: "Lütfen bir sokak bilgisi giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefon"
          name="phone"
          rules={[
            {
              required: true,
              message: "Lütfen bir telefon bilgisi giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="E-posta"
          name="email"
          rules={[
            {
              required: true,
              message: "Lütfen bir e-posta adresi giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Açılış ve Kapanış Saatleri"
          name="date"
          rules={[
            {
              required: true,
              message: "Lütfen mağazanın açılış ve kapanış saatlerini giriniz!",
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

export default AdminContactPage;
