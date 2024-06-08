import { Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Orders.css";

const Orders = ({ email }) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  const columns = [
    {
      title: "E-posta Adresiniz",
      dataIndex: "customer_email",
      key: "customer_email",
    },
    {
      title: "Ödeme Durumu",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount_total",
      key: "amount_total",
      render: (record) => <b>{(record / 100).toFixed(2)}$</b>,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/checkout/sessions`,
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
            if (data[i].customer_email === email) {
              setDataSource((prevDataSource) => [...prevDataSource, data[i]]);
            }
          }
          //   console.log(data);
        } else {
          message.error("Verileri getirme işlemi başarısız oldu!...");
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY, email]);

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
      />
    </Spin>
  );
};

export default Orders;

Orders.propTypes = {
  email: PropTypes.string,
};
