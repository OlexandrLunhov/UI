import React, { useState, useEffect } from "react";
import { getMessages, sendMessageToChat } from "../services/api";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams();
  const chatId = id;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    if (chatId) {
      getMessages(chatId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessageToChat(chatId, userId, message);
    const res = await getMessages(chatId);
    setMessages(res.data);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full text-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Повідомлення</h2>

      <div className="flex-1 border rounded-xl p-4 overflow-y-auto bg-gray-800 shadow-inner">
        {messages.map((msg, index) => {
          const isOwn = msg.sender === parseInt(userId);

          return (
            <div
              key={index}
              className={`mb-3 flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                <div
                  className={`text-sm font-semibold mb-1 ${
                    isOwn ? "text-blue-400" : "text-blue-300"
                  }`}
                >
                  {msg.sender_name}
                </div>
                <div
                  className={`px-4 py-2 rounded-xl shadow-sm ${
                    isOwn
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 border border-gray-600 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Напишіть повідомлення..."
          className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow transition"
        >
          Надіслати
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
