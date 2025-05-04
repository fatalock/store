import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import UserListPage from "./pages/UserListPage"; // eklenecek
import ProductListPage from "./pages/ProductListPage"; // opsiyonel
import CategoryListPage from "./pages/CategoryListPage"; // opsiyonel
import OrderListPage from "./pages/OrderListPage"; // opsiyonel

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route index path="/dashboard" element={<DashboardPage />} />

          {/* Yeni sade menü sistemi için ana sayfalar */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/orders" element={<OrderListPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
