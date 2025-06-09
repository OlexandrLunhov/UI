import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/auth");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <div className="flex gap-4 font-semibold text-lg">
        <Link to="/chats">TgChat</Link>
      </div>
      {isAuthenticated && (
        <div className="relative">
          <button onClick={toggleMenu} className="font-semibold hover:underline">Профіль</button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-lg shadow-lg border border-gray-600 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-600 transition"
              >
                Мій профіль
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-gray-600 transition"
              >
                Про додаток
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
              >
                Вийти
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

