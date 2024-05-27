import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <div className="single-topbar">
      <nav className="breadcrumb">
        <ul>
          <li>
            <a href="#">Anasayfa</a>
          </li>
          <li>
            <a href="#">Erkek</a>
          </li>
          <li>
            <a href="#">Pantolon</a>
          </li>
          <li>Paçaları Lastikli Renkli Eşofman Altı</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;
