import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Wallets = ({ wallets, addWallet, editWalletName }) => {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [walletIdToEdit, setWalletIdToEdit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      const newWallet = { name, balance: 0, transactions: [] };
      addWallet(newWallet);
      setName("");
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editName.trim() !== "") {
      editWalletName(walletIdToEdit, editName);
      setWalletIdToEdit(null);
      setEditName("");
    }
  };

  const startEditing = (walletId, currentName) => {
    setWalletIdToEdit(walletId);
    setEditName(currentName);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>I tuoi Wallet</h1>
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="mb-3">
              <Card.Body>
                <Card.Title>{wallet.name}</Card.Title>
                <Card.Text>Saldo: {wallet.balance}</Card.Text>
                <Link to={`/wallets/${wallet.id}`} className="btn btn-primary">
                  Dettagli
                </Link>
                <Button variant="secondary" onClick={() => startEditing(wallet.id, wallet.name)} className="ml-2">
                  Modifica Nome
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Aggiungi nuovo Wallet</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome del Wallet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Aggiungi Wallet
            </Button>
          </Form>
        </Col>
      </Row>
      {walletIdToEdit !== null && (
        <Row>
          <Col>
            <h2>Modifica Nome Wallet</h2>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formEditName">
                <Form.Label>Nuovo Nome del Wallet</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nuovo nome"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Modifica Nome
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Wallets;
