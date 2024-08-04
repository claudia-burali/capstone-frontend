import {
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  RESET_TRANSACTION_STATE,
} from "../actions/transaction";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};

const TransactionReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case ADD_TRANSACTION_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_TRANSACTION_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };
    case RESET_TRANSACTION_STATE:
      return initialState;
    case "DELETE_TRANSACTION_SUCCESS":
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};
export default TransactionReduce;
