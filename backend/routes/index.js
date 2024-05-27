const express = require("express");
const router = express.Router();

// Diğer route dosyalarını içeri aktarıyoruz
const productRoute = require("./products.js");
const authRoute = require("./auth.js");
const categoryRoute = require("./categories.js");
const couponRoute = require("./coupons.js");
const userRoute = require("./users.js");
const slideRoute = require("./slides.js");
const paymentRoute = require("./payment.js");
const logoRoute = require("./logo.js");
const contactRoute = require("./contact.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/slides", slideRoute);
router.use("/payment", paymentRoute);
router.use("/logo", logoRoute);
router.use("/contact", contactRoute);

module.exports = router;
