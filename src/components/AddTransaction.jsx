import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"; // usa useNavigate

const AddTransaction = ({ addTransaction }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // usa useNavigate
  const [value, setValue] = useState("");
  const [volume, setVolume] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [exchange, setExchange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      value: parseFloat(value),
      volume: parseFloat(volume),
      amount: parseFloat(amount),
      date,
      exchange,
    };
    addTransaction(id, newTransaction);
    navigate(`/wallets/${id}`); // usa navigate
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>Aggiungi Transazione</h1>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group controlId="formValue">
              <Form.Label className="my-1">Prezzo di acquisto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci prezzo di acquisto"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min="0"
                step="any"
                required
              />
            </Form.Group>

            <Form.Group controlId="formVolume">
              <Form.Label className="my-1">Importo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci importo"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                min="0"
                step="any"
                required
              />
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label className="my-1">Quantità acquistata</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci quantità acquistata"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="any"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label className="my-1">Data</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formExchange">
              <Form.Label className="my-1">Exchange</Form.Label>
              <Form.Control type="text" value={exchange} onChange={(e) => setExchange(e.target.value)} />
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
