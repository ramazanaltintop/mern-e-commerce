import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SliderItem = ({ slideImg, slide }) => {
  return (
    <div className="slider-item fade">
      <div className="slider-image">
        <img src={slideImg} className="img-fluid" alt="" />
      </div>
      <div className="container">
        <p className="slider-title">{slide.title}</p>
        <h2 className="slider-heading">{slide.subTitle}</h2>
        <Link to={"/shop"} className="btn btn-lg btn-primary">
          Şimdi Keşfet
        </Link>
      </div>
    </div>
  );
};

export default SliderItem;

SliderItem.propTypes = {
  slideImg: PropTypes.string,
  slide: PropTypes.object,
};
