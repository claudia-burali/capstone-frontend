import {
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "../actions/user";

const initialState = {
  loading: false,
  success: false,
  error: false,
  user: null,
  errorMsg: null,
};

const AccountReduce = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_REQUEST:
    case DELETE_ACCOUNT_REQUEST:
      return { ...state, loading: true };

    case UPDATE_ACCOUNT_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload, error: false, errorMsg: null };

    case UPDATE_ACCOUNT_FAILURE:
      return { ...state, loading: false, success: false, error: true, errorMsg: action.payload };

    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, loading: false, success: true, user: null, error: false, errorMsg: null };

    case DELETE_ACCOUNT_FAILURE:
      return { ...state, loading: false, success: false, error: true, errorMsg: action.payload };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: false, errorMsg: null };

    case FETCH_USER_FAILURE:
      return { ...state, loading: false, user: null, error: true, errorMsg: action.payload };

    default:
      return state;
  }
};

export default AccountReduce;
