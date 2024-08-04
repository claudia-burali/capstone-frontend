import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Modal, Form } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { LuPencil } from "react-icons/lu";

const WalletDetail = ({ wallets, addTransaction, deleteTransaction, updateTransaction }) => {
  const { id } = useParams();
  const wallet = wallets.find((w) => w.id === parseInt(id));

  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);

  const [value, setValue] = useState("");
  const [volume, setVolume] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [exchange, setExchange] = useState("");

  if (!wallet) {
    return <div>Wallet non trovato</div>;
  }

  const handleDeleteClick = (transactionIndex) => {
    setTransactionToDelete(transactionIndex);
    setShowDeleteModal(true);
  };

  const confirmDeleteTransaction = () => {
    deleteTransaction(wallet.id, transactionToDelete);
    setTransactionToDelete(null);
    setShowDeleteModal(false);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      value: parseFloat(value),
      volume: parseFloat(volume),
      amount: parseFloat(amount),
      date,
      exchange,
    };
    addTransaction(wallet.id, newTransaction);
    setValue("");
    setVolume("");
    setAmount("");
    setDate("");
    setExchange("");
    setShowAddTransactionModal(false);
  };

  const handleEditClick = (transactionIndex) => {
    const transaction = wallet.transactions[transactionIndex];
    setTransactionToEdit(transactionIndex);
    setValue(transaction.value);
    setVolume(transaction.volume);
    setAmount(transaction.amount);
    setDate(transaction.date);
    setExchange(transaction.exchange);
    setShowEditTransactionModal(true);
  };

  const handleEditTransaction = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      value: parseFloat(value),
      volume: parseFloat(volume),
      amount: parseFloat(amount),
      date,
      exchange,
    };
    updateTransaction(wallet.id, transactionToEdit, updatedTransaction);
    setShowEditTransactionModal(false);
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>{wallet.name}</h1>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="my-1 d-flex justify-content-between mb-3">
                <div>Saldo: {wallet.balance}</div>
                <div>Totale investito: {wallet.investment}</div>
                <div>Prezzo di acquisto medio: {wallet.average}</div>
              </Card.Title>
            </Card.Body>
          </Card>
          <div className="my-1 d-flex justify-content-between align-items-center">
            <div>
              <h2>Transazioni</h2>
            </div>
            <div>
              <Button variant="primary" onClick={() => setShowAddTransactionModal(true)}>
                <GrAdd className="mb-1" size={20} />
              </Button>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Prezzo di acquisto</th>
                <th>Importo</th>
                <th>Quantità acquistata</th>
                <th>Data</th>
                <th>Exchange</th>
                <th>Azione</th>
              </tr>
            </thead>
            <tbody>
              {wallet.transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.value}</td>
                  <td>{transaction.volume}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.exchange}</td>
                  <td>
                    <Button variant="secondary" onClick={() => handleEditClick(index)}>
                      <LuPencil className="mb-1" size={16} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(index)}>
                      <FaRegTrashCan className="mb-1" size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modale per confermare l'eliminazione della transazione */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="my-5">
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questa transazione?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDeleteTransaction}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale per aggiungere una nuova transazione */}
      <Modal show={showAddTransactionModal} onHide={() => setShowAddTransactionModal(false)} className="my-5">
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Transazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTransaction} className="my-2">
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
        </Modal.Body>
      </Modal>

      {/* Modale per modificare una transazione */}
      <Modal show={showEditTransactionModal} onHide={() => setShowEditTransactionModal(false)} className="my-5">
        <Modal.Header closeButton>
          <Modal.Title>Modifica Transazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditTransaction} className="my-2">
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
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default WalletDetail;
