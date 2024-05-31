import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { PropTypes } from "prop-types";

const CartCoupon = ({ isCouponApplied, setIsCouponApplied }) => {
  const [couponCode, setCouponCode] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { cartItems, setCartItems } = useContext(CartContext);

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      message.warning("Boş değer giremezsiniz!...");
      return;
    }
    if (isCouponApplied) {
      message.warning("Kupon kodu zaten uygulandı!...");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!response.ok) {
        message.warning("Girdiğiniz kupon kodu geçerli değildir!...");
        return;
      }

      const data = await response.json();

      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });

      setCartItems(updatedCartItems);
      setIsCouponApplied(true);
      localStorage.setItem("appliedCoupon", couponCode);

      message.success(
        `${couponCode} adlı kupon kodu başarılı bir şekilde uygulandı!...`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedCoupon = localStorage.getItem("appliedCoupon");
    if (storedCoupon) {
      setIsCouponApplied(true);
    }
  }, [setIsCouponApplied]);

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Kupon kodu"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" onClick={applyCoupon} type="button">
          Kuponu kaydet
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Sepeti Güncelle</button>
      </div>
    </div>
  );
};

export default CartCoupon;

CartCoupon.propTypes = {
  isCouponApplied: PropTypes.bool,
  setIsCouponApplied: PropTypes.func,
};
