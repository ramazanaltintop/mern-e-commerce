import { PropTypes } from "prop-types";
import "./Contact.css";

const Contact = ({ contact }) => {
  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src={contact?.iframe}
            width="100%"
            height="500"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h2>{contact?.title}</h2>
            <h4>{contact?.subTitle}</h4>
            <p>{contact?.description}</p>
          </div>
          <div className="contact-elements">
            <form className="contact-form">
              <div className="">
                <label>
                  Adınız
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  E-posta adresiniz
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  Konu
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  Mesajınız
                  <span>*</span>
                </label>
                <textarea
                  id="author"
                  name="author"
                  type="text"
                  defaultValue=""
                  size="30"
                  required=""
                ></textarea>
              </div>
              <button className="btn btn-sm form-button">Mesaj Gönder</button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> {contact?.shopTitle}</strong>
                  <p className="contact-street">{contact?.street}</p>
                  <a href="tel:Phone: +90 111 222 33 44">
                    Telefon: {contact?.phone}
                  </a>
                  <a href="mailto:Email: contact@example.com">
                    E-posta: {contact?.email}
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong>Açılış Saatleri</strong>
                  <p className="contact-date">{contact?.date}</p>
                  <p>Hafta Sonu {contact?.isWeekend}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

Contact.propTypes = {
  contact: PropTypes.object,
};
