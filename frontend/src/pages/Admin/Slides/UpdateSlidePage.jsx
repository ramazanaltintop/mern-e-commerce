import { Button, Form, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateSlidePage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const slideId = params.id;
  // console.log(slideId);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slides/${slideId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Slayt başarılı bir şekilde güncellendi!...");
      } else {
        message.error("Slayt güncelleme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Slayt güncelleme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleSlide = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slides/${slideId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme başarısız oldu!...");
      }

      const data = await response.json();

      if (data) {
        form.setFieldsValue({
          name: data.name,
          title: data.title,
          subTitle: data.subTitle,
          img: data.img,
        });
      }
    } catch (error) {
      console.log("Veri getirme hatası", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, form, slideId]);

  useEffect(() => {
    fetchSingleSlide();
  }, [fetchSingleSlide]);

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
          label="Slayt Başlığı"
          name="title"
          rules={[
            {
              required: true,
              message: "Lütfen slayt başlığını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slayt Alt Başlığı"
          name="subTitle"
          rules={[
            {
              required: true,
              message: "Lütfen slayt alt başlığını giriniz!",
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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateSlidePage;
