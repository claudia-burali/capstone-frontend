import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Wallets from "./components/Wallets";
import AddWallet from "./components/AddWallet";
import WalletDetail from "./components/WalletDetail";
import AddTransaction from "./components/AddTransaction";

const App = () => {
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: "Main Wallet",
      balance: 5000,
      transactions: [{ type: "Deposit", amount: 5000, date: "2024-01-01" }],
    },
  ]);

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

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wallets/:id/add-transaction" element={<AddTransaction addTransaction={addTransaction} />} />
          <Route path="/wallets/:id" element={<WalletDetail wallets={wallets} addTransaction={addTransaction} />} />
          <Route path="/wallets" element={<Wallets wallets={wallets} />} />
          <Route path="/add-wallet" element={<AddWallet addWallet={addWallet} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
