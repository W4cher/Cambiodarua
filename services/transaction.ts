import apiClient from './apiClient';

// Create a transaction
export async function createTransaction(payload: any) {
  try {
    const response = await apiClient({
      method: "post",
      url: "/transactions/",
      data: payload,
    });
    return response.data;
  } catch (err) {
    console.error("Error creating transaction:", err);
    throw err;
  }
}

// Get all transactions
export async function fetchAllTransactions() {
  try {
    const response = await apiClient({
      method: "get",
      url: "/transactions/",
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    throw err;
  }
}

// Get single transaction by ID
export async function fetchTransactionById(id: string) {
  try {
    const response = await apiClient({
      method: "get",
      url: `/transactions/${id}`,
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching transaction ${id}:`, err);
    throw err;
  }
}

// Update a transaction
export async function updateTransaction(id: string, payload: any) {
  try {
    const response = await apiClient({
      method: "put",
      url: `/transactions/${id}`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    console.error(`Error updating transaction ${id}:`, err);
    throw err;
  }
}

// Delete a transaction
export async function deleteTransaction(id: string) {
  try {
    const response = await apiClient({
      method: "delete",
      url: `/transactions/${id}`,
    });
    return response.data;
  } catch (err) {
    console.error(`Error deleting transaction ${id}:`, err);
    throw err;
  }
}
