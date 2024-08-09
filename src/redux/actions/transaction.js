import { fetchProtectedResource } from "./user";

export const ADD_TRANSACTION_REQUEST = "ADD_TRANSACTION_REQUEST";
export const ADD_TRANSACTION_SUCCESS = "ADD_TRANSACTION_SUCCESS";
export const ADD_TRANSACTION_FAILURE = "ADD_TRANSACTION_FAILURE";
export const RESET_TRANSACTION_STATE = "RESET_TRANSACTION_STATE";

export const resetTransactionState = () => ({
  type: RESET_TRANSACTION_STATE,
});

const addTransactionRequest = () => ({
  type: ADD_TRANSACTION_REQUEST,
});

const addTransactionSuccess = (data) => ({
  type: ADD_TRANSACTION_SUCCESS,
  payload: data,
});

const addTransactionFailure = (error) => ({
  type: ADD_TRANSACTION_FAILURE,
  payload: error,
});

export const AddTransaction = (transactionData, walletId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addTransactionRequest());
  try {
    const response = await fetch(`http://localhost:3001/transactions/${walletId}`, {
      method: "POST",
      body: JSON.stringify(transactionData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante l'aggiunta della transazione!");
    }

    dispatch(addTransactionSuccess(data.message));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addTransactionFailure(error.message));
  }
};

export const UpdateTransaction = (transactionData, transactionId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addTransactionRequest());
  try {
    const response = await fetch(`http://localhost:3001/transactions/${transactionId}`, {
      method: "PUT",
      body: JSON.stringify(transactionData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }
    dispatch(addTransactionSuccess(data.message));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addTransactionFailure(error.message));
  }
};

export const DeleteTransaction = (walletId, transactionId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`http://localhost:3001/transactions/${walletId}/${transactionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante l'eliminazione");
    }
    dispatch(addTransactionSuccess(data.message));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addTransactionFailure(error.message));
  }
};
