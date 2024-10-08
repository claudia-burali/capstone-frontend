import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../actions/user";

const initialState = {
  loading: false,
  success1: false,
  error: false,
  content: null,
  errorMsg: null,
};

const UserReduce = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, success1: true, content: action.payload, errorMsg: null, error: false };
    case REGISTER_USER_FAILURE:
      return { ...state, loading: false, errorMsg: action.payload, success1: false, error: true };

    default:
      return state;
  }
};
export default UserReduce;
