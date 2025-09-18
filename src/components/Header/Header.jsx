import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { userConnected, logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex flex-row justify-between items-center">
      <NavLink to="/">
        <span className="text-xl font-bold text-blue-500">SERIE BLOG</span>
      </NavLink>
      <nav className="flex space-x-6">
        {userConnected ? (
          <>
            <NavLink
              to="/profile"
              className="text-gray-600 hover:text-black font-semibold cursor-pointer"
            >
              <span>Bienvenue {userConnected.username}</span>
            </NavLink>
            <NavLink
              to="/login"
              onClick={logout}
              className="text-gray-600 hover:text-black font-semibold"
            >
              Déconnexion
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="text-gray-600 hover:text-black font-semibold"
            >
              Connexion
            </NavLink>
            <NavLink
              to="/register"
              className="text-gray-600 hover:text-black font-semibold"
            >
              Inscription
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
