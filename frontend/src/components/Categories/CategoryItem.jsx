import { Link } from "react-router-dom";
import "./CategoryItem.css";
import PropTypes from "prop-types";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <Link to={`products/${category._id}`}>
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
      </Link>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object,
};

export default CategoryItem;
