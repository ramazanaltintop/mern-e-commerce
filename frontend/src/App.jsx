import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import CreateSlidePage from "./pages/Admin/Slides/CreateSlidePage";
import SlidePage from "./pages/Admin/Slides/SlidePage";
import UpdateSlidePage from "./pages/Admin/Slides/UpdateSlidePage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import LogoPage from "./pages/Admin/LogoPage";
import AdminContactPage from "./pages/Admin/AdminContactPage";
import ListProductsByCategory from "./components/Categories/ListProductsByCategory";
import Orders from "./components/Auth/Orders";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/*">
        <Route index element={<ShopPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="products/:id" element={<ListProductsByCategory />} />
        <Route path="products/:id/:id" element={<ProductDetailsPage />} />
      </Route>
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/products/:id" element={<ListProductsByCategory />} />
      <Route path="/products/:id/:id" element={<ProductDetailsPage />} />
      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="slides" element={<SlidePage />} />
        <Route path="slides/create" element={<CreateSlidePage />} />
        <Route path="slides/update/:id" element={<UpdateSlidePage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="logo" element={<LogoPage />} />
        <Route path="contact" element={<AdminContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
