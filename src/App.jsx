// App.jsx
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";

function App() {
  const location = useLocation();

  const centeredRoutes = ["/login", "/register"];
  const isCentered = centeredRoutes.some((path) => location.pathname === path);

  return (
    <div className="h-screen flex flex-col">
      <AuthProvider>
        <BlogProvider>
          <Header />
          <main
            className={`flex-1 ${
              isCentered ? "flex items-center justify-center" : ""
            }`}
          >
            <Outlet />
          </main>
        </BlogProvider>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
