import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // const data = await response.json();
        // const { password, ...rest } = data;
        // localStorage.setItem("user", JSON.stringify(data));
        message.success("Kayıt olma işlemi başarıyla gerçekleştirildi!");
        navigate("/");
      } else {
        message.error("Kayıt olma işlemi başarısız oldu!");
      }
    } catch (error) {
      console.log("Giriş hatası", error);
    }
  };

  return (
    <div className="account-column">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Kullanıcı adı <span className="required">*</span>
            </span>
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              E-posta adresi <span className="required">*</span>
            </span>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Parola <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Kişisel verileriniz bu web sitesindeki deneyiminizi desteklemek,
            hesabınıza erişimi yönetmek ve{" "}
            <a href="#">gizlilik politikamızda</a> açıklanan diğer amaçlar için
            kullanılacaktır.
          </p>
          <button className="btn btn-sm">Kayıt Ol</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
