import React, { useState, useEffect } from "react";
import ChatPage from "./Chat";
import { getChats } from "../services/api";

const ChatListPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    getChats().then((res) => {
      setChats(res.data);
      if (!isMobile && res.data.length > 0) {
        setSelectedChatId(res.data[0].id);
      }
    });

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && chats.length > 0) {
        setSelectedChatId(chats[0].id);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chats]);

  const handleBack = () => setSelectedChatId(null);

  // 📱 Мобільна версія
  if (isMobile) {
    return (
      <div className="p-4 h-[calc(100vh-64px)] bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        {!selectedChatId ? (
          <aside className="bg-gray-700 rounded-2xl shadow-lg overflow-y-auto border border-gray-600 h-full">
            <h2 className="text-xl font-semibold p-4 border-b border-gray-600 bg-gray-800 rounded-t-2xl">
              💬 Чати
            </h2>
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className="p-4 cursor-pointer border-b border-gray-600 transition-all duration-150 ease-in-out hover:bg-gray-600 text-white"
                >
                  {chat.name}
                </li>
              ))}
            </ul>
          </aside>
        ) : (
          <main className="bg-gray-700 rounded-2xl shadow-lg p-4 border border-gray-600 h-full flex flex-col text-white">
            <button
              onClick={handleBack}
              className="mb-4 text-blue-400 hover:underline text-sm self-start"
            >
              ← Назад до списку чатів
            </button>
            <ChatPage chatId={selectedChatId} />
          </main>
        )}
      </div>
    );
  }

  // 💻 Десктопна версія
  return (
    <div className="p-4 grid grid-cols-12 gap-4 h-[calc(100vh-64px)] bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <aside className="col-span-3 bg-gray-700 rounded-2xl shadow-lg overflow-y-auto border border-gray-600">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-600 bg-gray-800 rounded-t-2xl">
          💬 Чати
        </h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 cursor-pointer border-b border-gray-600 transition-all duration-150 ease-in-out 
                ${selectedChatId === chat.id 
                  ? "bg-blue-600 font-medium text-white" 
                  : "hover:bg-gray-600 text-white"
                }`}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="col-span-9 bg-gray-700 rounded-2xl shadow-lg p-4 border border-gray-600">
        {selectedChatId && <ChatPage chatId={selectedChatId} />}
      </main>
    </div>
  );
};

export default ChatListPage;
