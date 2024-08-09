import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReduce from "../reducers/userReduce";
import UserLoginReduce from "../reducers/userReduceLogin";
import CurrencyPairReduce from "../reducers/currencyPairReduce";
import AccountReduce from "../reducers/accountReduce";
import TransactionReduce from "../reducers/transactionReduce";
import WalletReduce from "../reducers/walletReduce";

const rootReducer = combineReducers({
  user: UserReduce,
  authentication: UserLoginReduce,
  currencyPair: CurrencyPairReduce,
  wallet: WalletReduce,
  transaction: TransactionReduce,
  account: AccountReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
