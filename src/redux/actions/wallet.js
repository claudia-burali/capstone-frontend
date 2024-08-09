import { fetchProtectedResource } from "./user";

export const ADD_WALLET_REQUEST = "ADD_WALLET_REQUEST";
export const ADD_WALLET_SUCCESS = "ADD_WALLET_SUCCESS";
export const ADD_WALLET_FAILURE = "ADD_WALLET_FAILURE";
export const RESET_WALLET_STATE = "RESET_WALLET_STATE";

export const resetwalletState = () => ({
  type: RESET_WALLET_STATE,
});

const addWalletRequest = () => ({
  type: ADD_WALLET_REQUEST,
});

const addWalletSuccess = (data) => ({
  type: ADD_WALLET_SUCCESS,
  payload: data,
});

const addWalletFailure = (error) => ({
  type: ADD_WALLET_FAILURE,
  payload: error,
});

export const AddWallet = (walletData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addWalletRequest());
  try {
    const response = await fetch("http://localhost:3001/wallets", {
      method: "POST",
      body: JSON.stringify(walletData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante l'aggiunta del wallet!");
    }

    dispatch(addWalletSuccess(data.message));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addWalletFailure(error.message));
  }
};

export const UpdateWallet = (walletData, walletId) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  dispatch(addWalletRequest());
  try {
    const response = await fetch(`http://localhost:3001/wallets/${walletId}`, {
      method: "PATCH",
      body: JSON.stringify(walletData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante la modifica");
    }
    dispatch(addWalletSuccess(data.message));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addWalletFailure(error.message));
  }
};

export const DeleteWallet = (walletId) => async (dispatch, getState) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`http://localhost:3001/wallets/${walletId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { authentication } = getState();
    const updatedWallets = authentication.content.wallets.filter((wallet) => wallet.id !== walletId);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Errore durante l'eliminazione");
    }
    dispatch(addWalletSuccess(data.message));
    dispatch(fetchProtectedResource());
  } catch (error) {
    dispatch(addWalletFailure(error.message));
  }
};
