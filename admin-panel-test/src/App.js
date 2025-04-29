import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import UserAddPage from "./pages/UserAddPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page doğrudan / adresinde */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard altında nested route'lar */}
        <Route element={<DashboardLayout />}>
          <Route index path="/dashboard"  element={<DashboardPage />} />
          <Route path="users/add" element={<UserAddPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
