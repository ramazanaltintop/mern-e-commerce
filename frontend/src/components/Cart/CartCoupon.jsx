import { message } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { cartItems, setCartItems } = useContext(CartContext);

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      message.warning("Boş değer giremezsiniz!...");
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

      message.success(
        `${couponCode} adlı kupon kodu başarılı bir şekilde uygulandı!...`
      );
    } catch (error) {
      console.log(error);
    }
  };

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
