import { useCallback, useEffect, useState } from "react";
import Contact from "../components/Contact/Contact";
import { message } from "antd";

const ContactPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [contact, setContact] = useState(Object);
  const [contactData, setContactData] = useState(Object);
  const [fetchAllComplete, setFetchAllComplete] = useState(false);
  const contactId = contactData[0]?._id;

  const fetchAllContacts = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/contact`);

      if (response.ok) {
        const data = await response.json();
        setContactData(data);
        setFetchAllComplete(true);
      } else {
        message.error("Verileri getirme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Veri getirme hatası", error);
    }
  }, [apiUrl]);

  const fetchSingleContact = useCallback(async () => {
    if (fetchAllComplete) {
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
    }
  }, [apiUrl, contactId, fetchAllComplete]);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  useEffect(() => {
    fetchSingleContact();
  }, [fetchSingleContact]);

  return <Contact contact={contact} />;
};

export default ContactPage;
