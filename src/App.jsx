import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Wallets from "./components/Wallets";
import WalletDetail from "./components/WalletDetail";
import AddTransaction from "./components/AddTransaction";
import Account from "./components/Account";

const App = () => {
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: "Main Wallet",
      balance: 5000,
      transactions: [{ type: "Deposit", amount: 5000, date: "2024-01-01" }],
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountData, setAccountData] = useState({ username: "", email: "" });

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

  const editWalletName = (walletId, newName) => {
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === parseInt(walletId)) {
        wallet.name = newName;
      }
      return wallet;
    });
    setWallets(updatedWallets);
  };

  const handleLogin = (email, password) => {
    // Simula una chiamata di login
    setIsAuthenticated(true);
    setAccountData({ username: "User", email });
  };

  const handleRegister = (username, email, password) => {
    // Simula una chiamata di registrazione
    setIsAuthenticated(true);
    setAccountData({ username, email });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccountData({ username: "", email: "" });
  };

  return (
    <Router>
      <div>
        <NavigationBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} onRegister={handleRegister} />} />
          {isAuthenticated && (
            <>
              <Route path="/wallets/:id/add-transaction" element={<AddTransaction addTransaction={addTransaction} />} />
              <Route path="/wallets/:id" element={<WalletDetail wallets={wallets} addTransaction={addTransaction} />} />
              <Route
                path="/wallets"
                element={<Wallets wallets={wallets} addWallet={addWallet} editWalletName={editWalletName} />}
              />
              <Route path="/account" element={<Account accountData={accountData} />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
