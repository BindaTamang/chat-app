export const getUsers = async () => {
  let url = "http://localhost:8000/api/auth/users";
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const searchOrCreateUsers = async ({ sender, receiver }) => {
  let url = `http://localhost:8000/api/auth/users/?sender=${sender}&receiver=${receiver}`;
  try {
    const response = await fetch(url, {
      params: { sender, receiver },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching or creating users:", error);
    throw error;
  }
};
// export const getRecentLoginUser = async () => {
//     let url = "http://localhost:8000/api/auth/recent-login-user"
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
  
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching recent user:", error);
//       throw error;
//     }
//   };

// export const getSenderInfo = async (senderId, receiverId) => {
//     let url = `url:http://localhost:8000/api/message/searchhOrCreate/?sender=${senderId}=${receiverId}`
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: {
//             sender: senderId,
//             receiver: receiverId,
//         }
//       }
//       )
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching sender info:', error);
//       throw error;
//     }
//   };


