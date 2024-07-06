import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/User"; // Example import for fetching users
import "./ChatComponent.scss";
import {
  searchOrCreateConversation,
  getMessageDetail,
  sendMessage,
} from "../../api/message";

const ChatComponent = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  // Fetch list of users
  const getUserList = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data); // Assuming getUsers returns an object with a 'data' property containing users
      console.log("Fetched users:", response.data);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  // Function to search or create a conversation
  const searchOrCreateConversationHandler = async (selectedUserId) => {
    try {
      console.log("Searching or creating conversation...");
      const {data} = await searchOrCreateConversation(
        users[0]._id,
        selectedUserId
      );
      console.log(data)
      setConversationId(data._id);
      console.log("Conversation ID:", data._id);
      await getMessageDetailHandler(data._id);
    } catch (error) {
      console.error("Error searching or creating conversation:", error);
      setError("Failed to initialize chat. Please try again.");
    }
  };

  // Function to fetch message details
  const getMessageDetailHandler = async (conversationId) => {
    try {
      console.log("Fetching message details...");
      const {data} = await getMessageDetail(conversationId);
      setMessages(data);
      console.log("Fetched messages:", data);
    } catch (error) {
      console.error("Error fetching message detail:", error);
      setError("Failed to fetch messages. Please try again.");
    }
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {
    try {
      if (!conversationId) {
        console.error("No active conversation found");
        setError("No active conversation found. Please select users to start a conversation.");
        return;
      }

      console.log("Sending message...");
      await sendMessage(receiverId, users[0]._id, newMessage, conversationId);
      console.log("Message sent successfully.");
      setNewMessage(""); // Clear the message input after sending

      // Refresh messages after sending
      await getMessageDetailHandler(conversationId);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  // Function to handle user selection
  const handleUserSelection = async (selectedUserId) => {

    console.log("dddd",selectedUserId)
    setReceiverId(selectedUserId);
    await searchOrCreateConversationHandler(selectedUserId);
    // if (!senderId) {
    //   console.log("Selecting sender:", selectedUserId);
    //   setSenderId(selectedUserId);
    // } else if (!receiverId) {
    //   console.log("Selecting receiver:", selectedUserId);
    //   setReceiverId(selectedUserId);
    //   await searchOrCreateConversationHandler();
    // }
  };

  useEffect(() => {
    console.log("Fetching user list...");
    getUserList();
  }, []);

  return (
    <div className="chat-container">
      <div className="header">
        {/* Display user[0]'s name */}
        <div className="username">
          User: {users.length > 0 ? users[0].name : "Loading..."}
        </div>
        {/* Display user[0]'s _id */}
        <div className="chat-room">
          Chat Room: {users.length > 0 ? users[0]._id : ""}
        </div>
      </div>
      <div className="sidebar">
        <h3>Users</h3>
        <ul className="user">
          {users.slice(1).map((user) => (
            <li key={user._id} onClick={() => handleUserSelection(user._id)}>
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        <h3>Messages</h3>
        <div className="chat">
          {messages.length > 0 && messages[0].conversation.map((message) => (
            <div key={message._id} className="message">

            
              <span className="sender">{message.sender.name}</span>:{" "}
              {message.content}
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
          <button onClick={handleSendMessage}>Send</button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
