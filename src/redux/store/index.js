import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReduce from "../reducers/userReduce";
import UserLoginReduce from "../reducers/userReduceLogin";

const rootReducer = combineReducers({
  user: UserReduce,
  authentication: UserLoginReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
