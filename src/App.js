import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutPage from "./components/About";
import AuthPage from "./components/Auth";
import ProfilePage from "./components/Profile";
import ChatPage from "./components/Chat";
import ChatListPage from "./components/ChatList";
import Navbar from "./components/Navbar";

const isAuthenticated = () => !!localStorage.getItem("authToken");

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/chats" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/chats" element={<PrivateRoute><ChatListPage /></PrivateRoute>} />
        <Route path="/chat/:id" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      </Routes >
    </div >
  );
}

export default App;