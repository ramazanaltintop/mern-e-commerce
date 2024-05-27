import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş işlemi başarılı bir şekilde gerçekleştirildi!");
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error("Giriş işlemi başarısız oldu!");
      }
    } catch (error) {
      console.log("Sunucu hatası", error);
    }
  };

  return (
    <div className="account-column">
      <h2>Giriş</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>
              E-posta adresi <span className="required">*</span>
            </span>
            <input
              type="text"
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
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Beni hatırla</span>
          </label>
          <button className="btn btn-sm">Giriş</button>
        </p>
        <a href="#" className="form-link">
          Parolanızı unuttunuz mu?
        </a>
      </form>
    </div>
  );
};

export default Login;
