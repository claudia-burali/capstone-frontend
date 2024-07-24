import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddWallet = ({ addWallet }) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWallet = { name, balance: parseFloat(balance) };
    addWallet(newWallet);
    setName("");
    setBalance("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Aggiungi Wallet</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome Wallet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBalance">
              <Form.Label>Bilancio Iniziale</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci bilancio"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Aggiungi Wallet
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddWallet;
