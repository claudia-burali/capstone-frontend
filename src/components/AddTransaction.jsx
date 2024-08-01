import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"; // usa useNavigate

const AddTransaction = ({ addTransaction }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // usa useNavigate
  const [type, setType] = useState("Deposit");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { type, amount: parseFloat(amount), date };
    addTransaction(id, newTransaction);
    navigate(`/wallets/${id}`); // usa navigate
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>Aggiungi Transazione</h1>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group controlId="formType">
              <Form.Label className="my-1">Tipo di Transazione</Form.Label>
              <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Deposit</option>
                <option>Withdrawal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label className="my-1">Importo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci importo"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label className="my-1">Data</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Salva
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTransaction;
