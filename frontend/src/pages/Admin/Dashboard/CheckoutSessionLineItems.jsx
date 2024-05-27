import { message } from "antd";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const CheckoutSessionLineItems = ({ id, results }) => {
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  const fetchSessionLineItems = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${id}/line_items`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
          },
        }
      );

      if (response.ok) {
        const { data } = await response.json();
        for (let i = 0; i < data.length; i++) {
          if (data[i].description !== "Hızlı Kargo") {
            results.push(data[i].quantity);
          }
        }
      } else {
        message.error("Verileri getirme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Veri getirme hatası", error);
    }
  }, [MY_STRIPE_SECRET_KEY, id, results]);

  console.log(results);

  useEffect(() => {
    fetchSessionLineItems();
  }, [fetchSessionLineItems]);
  return <p></p>;
};

export default CheckoutSessionLineItems;

CheckoutSessionLineItems.propTypes = {
  id: PropTypes.string,
  results: PropTypes.array,
};
