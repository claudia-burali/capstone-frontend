import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Wallets from "./components/Wallets";
import WalletDetail from "./components/WalletDetail";
import Account from "./components/Account";
import { logoutUser } from "./redux/actions/user";
import { useDispatch } from "react-redux";

const App = () => {
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: "Main Wallet",
      balance: 0.25,
      investment: 500,
      average: 2000,
      currencyPair: "BTC/EUR",
      transactions: [{ value: 2000, volume: 500, amount: 0.25, date: "2024-01-01", exchange: "Binance" }],
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountData, setAccountData] = useState({ username: "", email: "" });
  const dispatch = useDispatch();

  const addWallet = (wallet) => {
    wallet.id = wallets.length + 1;
    wallet.transactions = [];
    setWallets([...wallets, wallet]);
  };

  const addTransaction = (walletId, transaction) => {
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === parseInt(walletId)) {
        wallet.transactions.push(transaction);
        wallet.balance += transaction.type === "Deposit" ? transaction.amount : -transaction.amount;
      }
      return wallet;
    });
    setWallets(updatedWallets);
  };

  const deleteTransaction = (walletId, transactionIndex) => {
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === parseInt(walletId)) {
        wallet.transactions.splice(transactionIndex, 1); // Rimuove la transazione
        // Ricalcola il saldo
        wallet.balance = wallet.transactions.reduce((acc, transaction) => {
          return acc + (transaction.type === "Deposit" ? transaction.amount : -transaction.amount);
        }, wallet.balance);
      }
      return wallet;
    });
    setWallets(updatedWallets);
  };

  const editWalletName = (walletId, newName, newCurrencyPair) => {
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === parseInt(walletId)) {
        wallet.name = newName;
        wallet.currencyPair = newCurrencyPair;
      }
      return wallet;
    });
    setWallets(updatedWallets);
  };

  const deleteWallet = (id) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id));
  };

  const handleLogin = (email, password) => {
    setIsAuthenticated(true);
    setAccountData({ username: "User", email });
  };

  const handleRegister = (username, email, password) => {
    setIsAuthenticated(true);
    setAccountData({ username, email });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccountData({ username: "", email: "" });
    dispatch(logoutUser());
  };

  return (
    <Router>
      <div>
        <NavigationBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} onRegister={handleRegister} />} />
          {isAuthenticated ? (
            <>
              <Route
                path="/wallets/:id"
                element={
                  <WalletDetail
                    wallets={wallets}
                    addTransaction={addTransaction}
                    deleteTransaction={deleteTransaction}
                  />
                }
              />
              <Route
                path="/wallets"
                element={
                  <Wallets
                    wallets={wallets}
                    addWallet={addWallet}
                    editWalletName={editWalletName}
                    deleteWallet={deleteWallet}
                  />
                }
              />
              <Route path="/account" element={<Account accountData={accountData} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
