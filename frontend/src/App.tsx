import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Layout } from "./components/Layout";
import { Catalog } from "./pages/Catalog";
import { UsersPage } from "./pages/UsersPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { OrdersPage } from "./pages/OrdersPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
