// --- Libraries Imports ---
import { Route, Routes } from "react-router-dom";
// --- Main Layout Imports ---
import Main from "./layouts/Main/Main";
// === Main's Page Imports ===
import Home from "./pages/main/Home/Home.jsx";
import Detail from "./pages/main/Detail/Detail.jsx";
import MultiCategory from "./pages/Main/MultiCategory/MultiCategory";
import SingleCategory from "./pages/main/SingleCategory/SingleCategory.jsx";
import Search from "./pages/main/Search/Search.jsx";
import ShopCart from "./pages/Main/ShopCart/ShopCart";
import UserInfo from "./pages/Main/UserInfo/UserInfo";
import History from "./pages/main/History/History.jsx";
import Error404 from "./pages/main/Error404/Error404.jsx";
// --- Admin Layout Imports ---
import Admin from "./layouts/Admin/Admin";
// === Admin's Page Imports ===
import AdminStatistics from "./pages/Admin/AdminStatistics/AdminStatistics";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import AdminUpdateUser from "./pages/Admin/AdminUpdateUser/AdminUpdateUser";
import AdminUpload from "./pages/Admin/AdminUpload/AdminUpload";
import AdminProducts from "./pages/Admin/AdminProducts/AdminProducts";
import AdminUpdate from "./pages/Admin/AdminUpdate/AdminUpdate";
import AdminOrder from "./pages/Admin/AdminOrder/AdminOrder";
// --- auth Layout Imports ---
import Auth from "./layouts/auth/auth";
// === auth's Page Imports ===
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
// --- Components Imports ---
import ScrollTop from "./components/ScrollTop/ScrollTop";
import AIChatBox from "../public/components/AIChatBox/AIChatBox.jsx";

// --- Implementation ---
function App() {
  return (
      <>
        <ScrollTop />
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="/categories">
              <Route index element={<MultiCategory />} />
              <Route path="/categories/:name" element={<SingleCategory />} />
            </Route>
            <Route path="/search/:key" element={<Search />} />
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/user" element={<UserInfo />} />
            <Route path="/history" element={<History />} />
            <Route path="/cart" element={<ShopCart />} />
            <Route path="*" element={<Error404 />} />
          </Route>
          {/* Admin Layout */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminStatistics />} />
            <Route path="/admin/users">
              <Route index element={<AdminUser />} />
              <Route path="/admin/users/:id" element={<AdminUpdateUser />} />
            </Route>
            <Route path="/admin/upload" element={<AdminUpload />} />
            <Route path="/admin/orders" element={<AdminOrder />} />
            <Route path="/admin/products">
              <Route index element={<AdminProducts />} />
              <Route path="/admin/products/:id" element={<AdminUpdate />} />
            </Route>
          </Route>
          {/* auth Layout */}
          <Route path="/auth" element={<Auth />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
        </Routes>
      <AIChatBox />
      </>
  );
}

export default App;
