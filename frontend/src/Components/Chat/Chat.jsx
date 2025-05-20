import React, { useState } from 'react';
import { FaEnvelope, FaTimes, FaComment } from 'react-icons/fa';
import './Chat.css';

const Chat = () => {
  // Datos estáticos de mensajes
  const staticMessages = [
    {
      id: 1,
      from: 'Soporte Técnico',
      date: '20 May 2023, 10:30 AM',
      subject: 'Mantenimiento programado',
      content: 'Estimado usuario, le informamos que habrá un mantenimiento programado el próximo viernes de 2:00 AM a 4:00 AM. Durante este tiempo el servicio podría no estar disponible. Disculpe las molestias.',
      read: false
    },
    {
      id: 2,
      from: 'Departamento de Recursos Humanos',
      date: '19 May 2023, 3:15 PM',
      subject: 'Actualización de políticas',
      content: 'Por favor revise las nuevas políticas de la empresa que han sido actualizadas este mes. Es importante que todos los empleados estén al tanto de estos cambios.',
      read: true
    },
    {
      id: 3,
      from: 'Administrador del Sistema',
      date: '18 May 2023, 9:00 AM',
      subject: 'Recordatorio: Cambio de contraseña',
      content: 'Este es un recordatorio amistoso para que cambie su contraseña según lo requiere nuestra política de seguridad cada 90 días. Su contraseña actual expirará en 5 días.',
      read: false
    }
  ];

  // Estado interno
  const [isOpen, setIsOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(staticMessages.filter(m => !m.read).length);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleMessageClick = (message) => {
    setActiveMessage(message);
    if (!message.read) {
      message.read = true;
      setUnreadCount(staticMessages.filter(m => !m.read).length);
    }
  };

  return (
    <>
      {/* Burbuja del chat */}
      <div className={`chat-bubble ${isOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        <FaComment className="chat-icon" />
        {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
      </div>

      {/* Ventana del chat */}
      {isOpen && (
        <div 
          className="modal-messages"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleChat();
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Mensajes ({staticMessages.length})</h2>
              <button 
                className="close-modal"
                onClick={toggleChat}
              >
                <FaTimes />
              </button>
            </div>

            <div className="messages-container">
              <div className="messages-list">
                {staticMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message-item ${!message.read ? 'unread' : ''} ${activeMessage?.id === message.id ? 'active' : ''}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="message-header">
                      <h4>{message.from}</h4>
                      <span className="message-date">{message.date}</span>
                    </div>
                    <p className="message-subject">{message.subject}</p>
                    {!message.read && <span className="unread-dot"></span>}
                  </div>
                ))}
              </div>

              <div className="message-content">
                {activeMessage ? (
                  <>
                    <div className="message-content-header">
                      <h3>{activeMessage.subject}</h3>
                      <div className="message-meta">
                        <span className="message-from">De: {activeMessage.from}</span>
                        <span className="message-date">{activeMessage.date}</span>
                      </div>
                    </div>
                    <div className="message-text">
                      <p>{activeMessage.content}</p>
                    </div>
                  </>
                ) : (
                  <div className="no-message-selected">
                    <FaEnvelope size={48} />
                    <p>Selecciona un mensaje para leerlo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;