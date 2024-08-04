import { ADD_WALLET_FAILURE, ADD_WALLET_REQUEST, ADD_WALLET_SUCCESS, RESET_WALLET_STATE } from "../actions/wallet";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};

const WalletReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WALLET_REQUEST:
      return { ...state, loading: true };
    case ADD_WALLET_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_WALLET_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_WALLET_STATE:
      return initialState;
    case "DELETE_WALLET_SUCCESS":
      return {
        ...state,
        wallets: state.wallets.filter((wallet) => wallet.id !== action.payload),
      };
    default:
      return state;
  }
};
export default WalletReduce;
