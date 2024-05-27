import "./BlogItem.css";

const BlogItem = () => {
  return (
    <li className="blog-item">
      <a href="#" className="blog-image">
        <img src="/img/blogs/blog1.jpg" alt="" />
      </a>
      <div className="blog-info">
        <div className="blog-info-top">
          <span>25 Nis, 2024 </span>-<span>0 Yorum</span>
        </div>
        <div className="blog-info-center">
          <a href="#">Aliquam hendrerit mi metus</a>
        </div>
        <div className="blog-info-bottom">
          <a href="#">Daha Fazla Bilgi Edinin</a>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;
