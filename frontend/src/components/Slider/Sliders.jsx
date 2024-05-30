import SliderItem from "./SliderItem";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./Sliders.css";

const Sliders = ({ slides }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="slider">
      <Slider {...sliderSettings}>
        {slides.map((slide) => (
          <SliderItem slide={slide} slideImg={slide.img} key={slide._id} />
        ))}
      </Slider>
    </section>
  );
};

export default Sliders;

Sliders.propTypes = {
  slides: PropTypes.array,
};
