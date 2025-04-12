// chatApi.ts
import apiClient from './apiClient';

export async function getUserChats() {
  try {
    const response = await apiClient({
      method: "get",
      url: "/chat/"
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching chats", err);
    throw err;
  }
}

export async function getChatByTransaction(transactionId: string, buyerId: string) {
  try {
    const response = await apiClient({
      method: "get",
      url: `/chat/${transactionId}/${buyerId}`
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching chat by transaction", err);
    throw err;
  }
}

export async function getMessagesByChatId(chatId: string) {
  try {
    const response = await apiClient({
      method: "get",
      url: `/chat/messages/${chatId}`
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching messages", err);
    throw err;
  }
}
