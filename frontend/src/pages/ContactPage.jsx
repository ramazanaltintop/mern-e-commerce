import { useEffect, useState } from "react";
import Contact from "../components/Contact/Contact";
import { message } from "antd";

const ContactPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const contactId = "6654432bd4caed6b69839aeb";
  const [contact, setContact] = useState();

  useEffect(() => {
    const fetchSingleContact = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/contact/${contactId}`);

        if (response.ok) {
          const data = await response.json();
          setContact(data);
        } else {
          message.error("Verileri getirme işlemi başarısız oldu!...");
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      }
    };

    fetchSingleContact();
  }, [apiUrl]);

  return <Contact contact={contact} />;
};

export default ContactPage;
