// import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartCoupon from "./CartCoupon";
import CartTotals from "./CartTotals";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import "./Cart.css";
import { message } from "antd";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // Kupon kodunu silme işlevi
  const removeCoupon = useCallback(() => {
    // Kupon kodu uygulama durumunu sıfırla
    if (localStorage.getItem("appliedCoupon")) {
      setIsCouponApplied(false);
      // LocalStorage'daki kupon kodu bilgisini sil
      localStorage.removeItem("appliedCoupon");
      message.success("Kupon kodu başarıyla kaldırıldı.");
    }
  }, []);

  useEffect(() => {
    if (!(cartItems.length > 0)) {
      removeCoupon();
    }
  }, [removeCoupon, cartItems.length]);

  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              {/* <CartProgress /> */}
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon
                  isCouponApplied={isCouponApplied}
                  setIsCouponApplied={setIsCouponApplied}
                />
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        ) : (
          <h2>Sepette ürün bulunmamaktadır!...</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;
