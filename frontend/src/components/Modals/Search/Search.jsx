import Proptypes from "prop-types";
import { Spin, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };

  const handleSearch = async (e) => {
    setLoading(true);
    e.preventDefault();
    const productName = e.target[0].value;

    if (productName.trim().length === 0) {
      message.warning("Boş karakter arayamazsınız!...");
      return;
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/products/search/${productName.trim()}`
      );

      if (!response.ok) {
        message.error("Ürün getirilemedi!...");
        return;
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Ürün ara</h3>
        <p className="modal-text">
          Aradığınız ürünleri görmek için yazmaya başlayın.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Bir ürün ara" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>ÜRÜNDEN SONUÇLAR</h3>
          </div>
          <Spin spinning={loading}>
            <div
              className="results"
              style={{
                display: `${
                  searchResults?.length === 0 || !searchResults
                    ? "flex"
                    : "grid"
                }`,
              }}
            >
              {!searchResults && (
                <b
                  className="result-item"
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  Ürün Ara!...
                </b>
              )}
              {searchResults?.length === 0 && (
                <a
                  href="#"
                  className="result-item"
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  😔Aradığınız Ürün Bulunamadı😔
                </a>
              )}
              {searchResults?.length > 0 &&
                searchResults?.map((resultItem) => (
                  <Link
                    to={`product/${resultItem._id}`}
                    href="#"
                    className="result-item"
                    key={resultItem._id}
                  >
                    <img
                      src={resultItem.img[0]}
                      className="search-thumb"
                      alt=""
                    />
                    <div className="search-info">
                      <h4>{resultItem.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">
                        {resultItem.price.current.toFixed(2)}$
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </Spin>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearchShow: Proptypes.bool,
  setIsSearchShow: Proptypes.func,
};
