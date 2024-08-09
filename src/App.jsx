import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.scss";
/*import "./App.css";*/
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Wallets from "./components/Wallets";
import WalletDetail from "./components/WalletDetail";
import Account from "./components/Account";
import { deleteAccount, logoutUser } from "./redux/actions/user";
import { useDispatch } from "react-redux";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountData, setAccountData] = useState({ username: "", email: "" });
  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    setIsAuthenticated(true);
    setAccountData({ username: "User", email });
  };

  const handleRegister = (username, email, password) => {
    // L'utente non viene autenticato automaticamente dopo la registrazione
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccountData({ username: "", email: "" });
    dispatch(logoutUser());
  };

  const updateAccount = (updatedData) => {
    setAccountData({
      ...accountData,
      username: updatedData.username,
      email: updatedData.email,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      birthDate: updatedData.birthDate,
    });
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
              <Route path="/wallets/:id" element={<WalletDetail />} />
              <Route path="/wallets" element={<Wallets />} />
              <Route
                path="/account"
                element={
                  <Account accountData={accountData} updateAccount={updateAccount} handleLogout={handleLogout} />
                }
              />
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
