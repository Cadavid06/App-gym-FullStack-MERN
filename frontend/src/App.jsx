import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MemberShipsPage from "./pages/MembershipsPage";
import MembershipFormPage from "./pages/MembershipFormPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import { MembershipProvider } from "./context/MembershipContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <MembershipProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/memberships" element={<MemberShipsPage />} />
              <Route path="/add-memberships" element={<MembershipFormPage />} />
              <Route path="/membership/:id" element={<MembershipFormPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MembershipProvider>
    </AuthProvider>
  );
}

export default App;
