import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SliderItem = ({ slideItem }) => {
  return (
    <div className="slider-item fade">
      <div className="slider-image">
        <img src={slideItem} className="img-fluid" alt="" />
      </div>
      <div className="container">
        <p className="slider-title">YAZ 2024</p>
        <h2 className="slider-heading">%50`ye varan indirim</h2>
        <Link to={"/shop"} className="btn btn-lg btn-primary">
          Şimdi Keşfet
        </Link>
      </div>
    </div>
  );
};

export default SliderItem;

SliderItem.propTypes = {
  slideItem: PropTypes.string,
};
