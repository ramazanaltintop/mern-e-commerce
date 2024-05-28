import { Row, Col, Card, Statistic, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CheckoutSessionLineItems from "./CheckoutSessionLineItems";

const DashboardPage = () => {
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;
  const [totalPrice, setTotalPrice] = useState(0);
  const [customers] = useState([]);
  const [numberOfCustomers, setNumberOfCustomers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [allCheckoutSessionsIds] = useState([]);
  const [results] = useState([]);
  const [totalProductSales, setTotalProductSales] = useState(0);

  const productSalesData = [
    { name: "Ocak", satilanUrunSayisi: 10 },
    { name: "Şubat", satilanUrunSayisi: 15 },
    { name: "Mart", satilanUrunSayisi: 20 },
    { name: "Nisan", satilanUrunSayisi: 25 },
    { name: "Mayıs", satilanUrunSayisi: 30 },
    { name: "Haziran", satilanUrunSayisi: 35 },
  ];

  const customerData = [
    { name: "Ocak", musteriSayisi: 20 },
    { name: "Şubat", musteriSayisi: 25 },
    { name: "Mart", musteriSayisi: 30 },
    { name: "Nisan", musteriSayisi: 10 },
    { name: "Mayıs", musteriSayisi: 40 },
    { name: "Haziran", musteriSayisi: 45 },
  ];

  const calculateTotalPrice = (data) => {
    let totalPrice = 0;
    data.map((item) => {
      (totalPrice += item.amount / 100).toFixed(2);
    });
    setTotalPrice(totalPrice);
  };

  const calculateNumberOfCustomers = useCallback(
    (data) => {
      data.map((item) => {
        if (!customers.includes(item.receipt_email)) {
          customers.push(item.receipt_email);
        }
      });
      setNumberOfCustomers(customers.length);
    },
    [customers]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentIntentsResponse, listAllCheckoutSessionsResponse] =
          await Promise.all([
            fetch(`https://api.stripe.com/v1/payment_intents`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
              },
            }),
            fetch(`https://api.stripe.com/v1/checkout/sessions`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
              },
            }),
          ]);

        if (!paymentIntentsResponse.ok || !listAllCheckoutSessionsResponse.ok) {
          message.error("Verileri getirme işlemi başarısız oldu!...");
          return;
        }

        const [paymentIntentsData, listAllCheckoutSessionsData] =
          await Promise.all([
            paymentIntentsResponse.json(),
            listAllCheckoutSessionsResponse.json(),
          ]);

        const { data } = paymentIntentsData;

        // Toplam gelir hesapla
        calculateTotalPrice(data);

        // Toplam müşteri sayısını hesapla
        calculateNumberOfCustomers(data);

        // Toplam sipariş sayısını hesapla
        setNumberOfOrders(data.length);

        const sessionData = listAllCheckoutSessionsData;

        // Verilen siparişlerin id bilgileri alındı.
        for (let i = 0; i < sessionData.data.length; i++) {
          allCheckoutSessionsIds.push(sessionData.data[i].id);
        }

        // console.log(allCheckoutSessionsIds);
      } catch (error) {
        console.log("Veri getirme hatası", error);
      }
    };
    fetchData();
  }, [
    MY_STRIPE_SECRET_KEY,
    allCheckoutSessionsIds,
    calculateNumberOfCustomers,
  ]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          {allCheckoutSessionsIds?.map((id, index) => (
            <CheckoutSessionLineItems
              id={id}
              key={index}
              results={results}
              setTotalProductSales={setTotalProductSales}
            />
          ))}
          <Card>
            <Statistic title="Toplam Ürün Satışı" value={totalProductSales} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Toplam Sipariş Sayısı" value={numberOfOrders} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Toplam Müşteri Sayısı"
              value={numberOfCustomers}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Toplam Gelir" value={`${totalPrice}$`} />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: "20px" }}>
        <h2>Son Aydaki Ürün Satış Artışı</h2>
        <LineChart
          width={600}
          height={600}
          data={productSalesData}
          margin={{ top: 5, right: 30, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="satilanUrunSayisi"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <h2>Son Aydaki Müşteri Artışı</h2>
        <LineChart
          width={600}
          height={300}
          data={customerData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="musteriSayisi"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;
