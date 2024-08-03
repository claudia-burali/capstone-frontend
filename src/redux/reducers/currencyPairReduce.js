import { ADD_CURRENCYPAIR_FAILURE, ADD_CURRENCYPAIR_REQUEST, ADD_CURRENCYPAIR_SUCCESS } from "../actions/currencyPair";

const initialState = {
  loading: false,
  success: false,
  error: false,
  content: null,
  errorMsg: null,
};

const CurrencyPairReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENCYPAIR_REQUEST:
      return { ...state, loading: true };
    case ADD_CURRENCYPAIR_SUCCESS:
      return { ...state, loading: false, success: true, content: action.payload, errorMsg: null, error: false };
    case ADD_CURRENCYPAIR_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success: false, error: true };

    default:
      return state;
  }
};
export default CurrencyPairReduce;
