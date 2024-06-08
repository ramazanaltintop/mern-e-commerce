import { Button } from "antd";
import PropTypes from "prop-types";

const UserDetails = ({ userDetails, user, setIsOrderDetail }) => {
  const handleClick = () => {
    setIsOrderDetail(true);
  };

  return (
    <div className="account-column">
      <h2>Bilgileriniz</h2>
      <form>
        <div>
          <label>
            <h3>Avatar:</h3>
            <span>
              <img src={userDetails.avatar} alt="" />
            </span>
          </label>
        </div>
        <div>
          <label>
            <h3>Kullanıcı adı:</h3>
            <span>{userDetails.username}</span>
          </label>
        </div>
        <div>
          <label>
            <h3>E-posta adresi:</h3>
            <span>{userDetails.email}</span>
          </label>
        </div>
        <div>
          <label>
            <h3>Rolünüz:</h3>
            <span>{user.role}</span>
          </label>
        </div>
        <div>
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            Siparişlerim
          </Button>
        </div>
      </form>
    </div>
  );
};

UserDetails.propTypes = {
  userDetails: PropTypes.object,
  user: PropTypes.object,
  setIsOrderDetail: PropTypes.func,
};

export default UserDetails;
