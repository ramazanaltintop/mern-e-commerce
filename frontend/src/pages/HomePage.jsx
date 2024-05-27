import Sliders from "../components/Slider/Sliders";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaigns/Campaigns";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import React, { useEffect, useState } from "react";
import { message } from "antd";

const HomePage = () => {
  const [slides, setSlides] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/slides`);

        if (response.ok) {
          const data = await response.json();
          setSlides(data);
        } else {
          message.error("Verileri getirme işlemi başarısız oldu!...");
        }
      } catch (error) {
        console.log("Veri getirme hatası", error);
      }
    };
    fetchSlides();
  }, [apiUrl]);

  return (
    <React.Fragment>
      <Sliders slides={slides} />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
