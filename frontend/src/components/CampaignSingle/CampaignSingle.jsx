import { Link } from "react-router-dom";
import "./CampaignSingle.css";

const CampaignSingle = () => {
  return (
    <section className="campaign-single">
      <div className="container">
        <div className="campaign-wrapper">
          <h2>Yeni Sezon İndirimi</h2>
          <strong>%40 İNDİRİM</strong>
          <span></span>
          <Link to={"/shop"} className="btn btn-lg">
            ŞİMDİ SATIN AL
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampaignSingle;
