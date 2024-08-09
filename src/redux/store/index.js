import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReduce from "../reducers/userReduce";
import UserLoginReduce from "../reducers/userReduceLogin";
import CurrencyPairReduce from "../reducers/currencyPairReduce";
import AccountReduce from "../reducers/accountReduce";
import TransactionReduce from "../reducers/transactionReduce";
import WalletReduce from "../reducers/walletReduce";
import { ImageReduce } from "../reducers/imageReduce";

const rootReducer = combineReducers({
  user: UserReduce,
  authentication: UserLoginReduce,
  currencyPair: CurrencyPairReduce,
  wallet: WalletReduce,
  transaction: TransactionReduce,
  account: AccountReduce,
  image: ImageReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
