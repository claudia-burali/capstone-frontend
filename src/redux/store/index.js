import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReduce from "../reducers/userReduce";
import UserLoginReduce from "../reducers/userReduceLogin";
import CurrencyPairReduce from "../reducers/currencyPairReduce";

const rootReducer = combineReducers({
  user: UserReduce,
  authentication: UserLoginReduce,
  currencyPair: CurrencyPairReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
