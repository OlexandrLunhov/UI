import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getProfile(userId).then((res) => setUser(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 text-white shadow-lg rounded-lg mt-8 border border-gray-700">
      <h2 className="text-3xl font-extrabold text-indigo-300 mb-6">
        Профіль
      </h2>
      {user ? (
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium">
              <span className="font-bold text-indigo-400">Ім’я:</span> {user.username}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <span className="font-bold text-indigo-400">Email:</span> {user.email}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <span className="font-bold text-indigo-400">Стать:</span> {user.gender}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <span className="font-bold text-indigo-400">Дата народження:</span> {user.birth_date}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-400">Завантаження...</p>
      )}
    </div>
  );
};

export default ProfilePage;
