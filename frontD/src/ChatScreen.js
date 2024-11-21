import React, { useEffect, useState } from 'react';
import './ChatScreen.css';

const ChatScreen = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatSessions = async () => {
      console.log('Cookies actuales en el frontend:', document.cookie);
  
      try {
        const response = await fetch('http://localhost:3030/messages/getMessages', {
          method: 'GET',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('Datos recibidos del servidor:', data);
  
        setChatSessions(data.messages || []);
      } catch (err) {
        console.error('Error al obtener las sesiones de chat:', err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchChatSessions();
  }, []);
  
  if (loading) return <p>Cargando sesiones de chat...</p>;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-messages">
        {chatSessions.map((session) => (
          <div
            key={session.id}
            className={`chat-bubble ${session.sender.username === 'MiNombreDeUsuario' ? 'sent' : 'received'}`}
          >
            <p className="chat-username">{session.sender.username}</p>
            <p className="chat-message">{session.content}</p>
            <p className="chat-timestamp">{new Date(session.created_at).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatScreen;
