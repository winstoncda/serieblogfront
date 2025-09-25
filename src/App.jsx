// App.jsx
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  const location = useLocation();

  const clientId = import.meta.env.VITE_GOOGLE_AUTH;

  const centeredRoutes = ["/login", "/register"];
  const isCentered = centeredRoutes.some((path) => location.pathname === path);

  return (
    <div className="h-screen flex flex-col">
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <BlogProvider>
            <NotificationProvider>
              <Header />
              <main
                className={`flex-1 ${
                  isCentered ? "flex items-center justify-center" : ""
                }`}
              >
                <Outlet />
              </main>
            </NotificationProvider>
          </BlogProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
