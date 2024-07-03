import React, { useState, useEffect } from 'react';
import './ChatComponent.scss';


const ChatComponent = ({ currentRoom, username}) => {
    // const users = [
    //     {
    //         id: 1,
    //         username: 'binda Tamnag',
    //     },
    //     {
    //         id: 2,
    //         username: 'asmita Tamnag',
    //     }
    // ]
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Example function to fetch messages (replace with actual API call)
  const fetchMessages = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('api/messages');
      const data = await response.json();
      setMessages(data.messages);
      // Assuming the users data is fetched separately
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages when component mounts
  }, []);

  const sendMessage = async () => {
    try {
      // Replace with actual API call to send message
      const response = await fetch('api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await response.json();
      // Assuming data contains the updated messages
      setMessages([...messages, { sender: username, content: newMessage }]);
    //   setMessages(data.messages);
      setNewMessage(''); // Clear the input field after sending message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <div className="username">
          User: {username}
        </div>
        <div className="chat-room">
          Chat Room: {currentRoom}
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="members">
            {users.map((user, index) => (
              <div key={index} className='user'>
                <span className='user'>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="main">
          <div className="chat">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <span className="sender">{message.sender}</span>: {message.content}
              </div>
            ))}
          </div>
          <div className="footer">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
