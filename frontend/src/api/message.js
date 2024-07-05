// import axios from "axios";


// const API_URL = "http://localhost:8000/api/message";
// export const getMessages = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/messages`);
//     return response.data;
//   } catch (error) {
//     throw error; // Handle error in the component where this function is used
//   }
// };

// // export const sendMessage = async (messageData) => {
// //   try {
// //     const response = await axios.post(`${API_URL}/sendMessage`, messageData);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error sending message:", error);
// //     throw error;
// //   }
// // };

// // const searchOrCreateConversation = async () => {
// //   try {
// //     const response = await axios.post('/api/conversations/searchOrCreate', {
// //       sender: senderId,
// //       receiver: receiverId
// //     });
// //     const { conversationId } = response.data;
// //     setConversationId(conversationId);
// //     // Fetch message details for the newly created conversation
// //     await fetchMessageDetails(conversationId);
// //   } catch (error) {
// //     console.error('Error searching or creating conversation:', error);
// //   }
// // };

// //
// // export const searchOrCreateUsers = async ({ sender, receiver }) => {
// //   const url = `${API_URL}/searchOrCreate/?sender=${sender}&receiver=${receiver}`;
// //   try {
// //     const response = await axios.get(url);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error searching or creating users:", error);
// //     throw error;
// //   }
// // };

// // export const getConversationDetail = async (conversationId) => {
// //   const url = `${API_URL}/messageDetail?conversationId=${conversationId}`;
// //   try {
// //     const response = await axios.get(url);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching conversation detail:", error);
// //     throw error;
// //   }
// // };
// export const searchOrCreateConversation = async (sender, receiver) => {
//   try {
//     const response = await fetch(`${API_URL}/searchOrCreate`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ sender, receiver })
//     });

//     if (!response.ok) {
//       throw new Error(`Error searching or creating conversation: ${response.statusText}`);
//     }

//     return response.json();
//   } catch (error) {
//     throw new Error(`Error searching or creating conversation: ${error.message}`);
//   }
// };

// // Function to fetch message details
// export const getMessageDetail = async (conversationId) => {
//   try {
//     const response = await fetch(`${API_URL}/messageDetail?conversationId=${conversationId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
      
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(`Error fetching message detail: ${error.message}`);
//   }
// };

// // Function to send a message
// export const sendMessage = async (receiver, sender, content, conversationId) => {
//   try {
//     const response = await fetch(`${API_URL}/sendMessage`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ receiver, sender, content, conversationId })
//     });

//     if (!response.ok) {
//       throw new Error(`Error sending message: ${response.statusText}`);
//     }

//     return response.json(); // Assuming backend sends JSON response
//   } catch (error) {
//     throw new Error(`Error sending message: ${error.message}`);
//   }
// };

const API_URL = "http://localhost:8000/api/message";

// Function to search or create conversation
export const searchOrCreateConversation = async (sender, receiver) => {
  try {
    const response = await fetch(`${API_URL}/searchOrCreate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sender, receiver })
    });

    if (!response.ok) {
      throw new Error(`Error searching or creating conversation: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error searching or creating conversation: ${error.message}`);
  }
};

// Function to fetch message details
export const getMessageDetail = async (conversationId) => {
  try {
    const response = await fetch(`${API_URL}/messageDetail?conversationId=${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching message detail: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching message detail: ${error.message}`);
  }
};

// Function to send a message
export const sendMessage = async (receiver, sender, content, conversationId) => {
  try {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ receiver, sender, content, conversationId })
    });

    if (!response.ok) {
      throw new Error(`Error sending message: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error sending message: ${error.message}`);
  }
};
