import "./CategoryItem.css";
import PropTypes from "prop-types";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <a href="#">
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object,
};

export default CategoryItem;
