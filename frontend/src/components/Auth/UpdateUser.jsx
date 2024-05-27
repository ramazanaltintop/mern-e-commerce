import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UpdateUser = ({ setUserDetails, user }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setUserDetails(values);
        message.success("Kullanıcı başarılı bir şekilde güncellendi!...");
      } else {
        message.error("Kullanıcı güncelleme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Kullanıcı güncelleme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/users/${user.id}`);

        if (!response.ok) {
          throw new Error("Verileri getirme başarısız oldu!...");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            avatar: data.avatar,
            username: data.username,
            email: data.email,
          });
          setUserDetails(data);
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleUser();
  }, [apiUrl, form, setUserDetails, user.id]);

  return (
    <div className="account-column">
      <h2>Güncelle</h2>
      <Spin spinning={loading}>
        <Form name="basic" autoComplete="off" form={form} onFinish={onFinish}>
          <h3>Avatar (Bağlantı)</h3>
          <Form.Item
            name="avatar"
            rules={[
              {
                required: true,
                message:
                  "Lütfen bir profil fotoğrafı için resim bağlantısı giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <h3>Kullanıcı adı</h3>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Lütfen kullanıcı adını giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <h3>E-posta</h3>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Geçerli bir e-posta adresi giriniz!",
              },
              {
                required: true,
                message: "Lütfen bir e-posta adresi giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <h3>Parola</h3>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Lütfen parolanızı giriniz!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <h3>Parolanızı Doğrulayın</h3>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Lütfen parolanızı giriniz!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Girdiğiniz parolalar birbiriyle eşleşmiyor!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

UpdateUser.propTypes = {
  setUserDetails: PropTypes.func,
  user: PropTypes.object,
};

export default UpdateUser;
