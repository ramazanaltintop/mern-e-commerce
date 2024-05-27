import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon başarılı bir şekilde güncellendi!...");
      } else {
        message.error("Kupon güncelleme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Kupon güncelleme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCoupon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme başarısız oldu!...");
      }

      const data = await response.json();

      if (data) {
        form.setFieldsValue({
          code: data.code,
          discountPercent: data.discountPercent,
        });
      }
    } catch (error) {
      console.log("Veri getirme hatası", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, couponId, form]);

  useEffect(() => {
    fetchSingleCoupon();
  }, [fetchSingleCoupon]);

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kupon Kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen kupon kodunu giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen ilgili kupon kodunun indirim oranını giriniz!",
            },
          ]}
        >
          <InputNumber />
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

export default UpdateCouponPage;
