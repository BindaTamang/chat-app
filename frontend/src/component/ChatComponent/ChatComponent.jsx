import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatComponent.scss'

const ChatComponent = ({ username }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch all users
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetch all messages
    axios.get('/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const sendMessage = async () => {
    try {
      // Send message
      const response = await axios.post('/api/messages', {
        sender: username,
        content: newMessage
      });
      setMessages([...messages, response.data]); // Add new message to state
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <div className="username">User: {username}</div>
        <div className="chat-room">Chat Room: {username}'s Chat Room</div>
      </div>
      <div className="sidebar">
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div className="main">
        <h3>Messages</h3>
        <div className="chat">
          {messages.map(message => (
            <div key={message._id} className="message">
              <span className="sender">{message.sender.username}</span>: {message.content}
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
  );
};

export default ChatComponent;
