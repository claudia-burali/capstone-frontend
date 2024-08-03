import { ADD_WALLET_FAILURE, ADD_WALLET_REQUEST, ADD_WALLET_SUCCESS } from "../actions/wallet";

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

    default:
      return state;
  }
};
export default WalletReduce;
