import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItemByCategory from "./ProductItemByCategory";

const ListProductsByCategory = () => {
  const params = useParams();
  const categoryId = params.id;
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProductsByCategoryId = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/products/filter/${categoryId}`
        );

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Verileri getirme işlemi başarısız oldu!...");
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      }
    };
    fetchProductsByCategoryId();
  }, [apiUrl, categoryId]);
  return (
    <section className="products">
      <div className="container">
        <div
          className="product-wrapper product-carousel"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products.map((productItem, index) => (
            <ProductItemByCategory key={index} productItem={productItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListProductsByCategory;
