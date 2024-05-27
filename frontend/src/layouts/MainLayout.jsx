import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import PropTypes from "prop-types";
import Search from "../components/Modals/Search/Search";
import { useEffect, useState } from "react";
import Dialog from "../components/Modals/Dialog/Dialog";
import { message } from "antd";

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [logo, setLogo] = useState("");
  const logoId = "6651ab28548b1f711b264d13";
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

    const fetchSingleLogo = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/logo/${logoId}`);

        if (response.ok) {
          const data = await response.json();
          setLogo(data.name);
        } else {
          message.error("Verileri getirme işlemi başarısız oldu!...");
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      }
    };

    const logoControl = () => {
      if (logo.startsWith("http")) {
        setIsImage(true);
      } else {
        setIsImage(false);
      }
    };

    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
    fetchSingleLogo();
    logoControl();
  }, [apiUrl, logo]);

  return (
    <div className="main-layout">
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Header setIsSearchShow={setIsSearchShow} logo={logo} isImage={isImage} />
      {children}
      <Footer logo={logo} isImage={isImage} />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node,
};
