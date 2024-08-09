import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AddTransaction, resetTransactionState } from "../redux/actions/transaction";
import EditTransactionModal from "./EditTransactionModal";
import DeleteTransactionModal from "./DeleteTransactionModal";
import { fetchProtectedResource } from "../redux/actions/user";

const WalletDetail = () => {
  const { id } = useParams();
  const { content } = useSelector((state) => state.authentication);
  const [wallet, setWallet] = useState(null);

  const [formData, setFormData] = useState({
    volume: "",
    value: "",
    amount: "",
    date: "",
    exchange: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (content && content.wallets) {
      const foundWallet = content.wallets.find((wallet1) => wallet1.id === id);
      setWallet(foundWallet);
    }
  }, [content, id]);

  useEffect(() => {
    dispatch(fetchProtectedResource());
  }, [dispatch]);

  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (transaction) => {
    setShowDeleteModal(true);
    setTransactionToDelete(transaction);
  };
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const handleCloseAddTransactionModal = () => setShowAddTransactionModal(false);
  const handleShowAddTransactionModal = () => setShowAddTransactionModal(true);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
  const handleCloseEditTransactionModal = () => setShowEditTransactionModal(false);
  const handleShowEditTransactionModal = (transaction) => {
    setShowEditTransactionModal(true);
    setTransactionToEdit(transaction);
  };
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { loading, success, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetTransactionState());
        handleCloseAddTransactionModal();
      }, 3000);
    }
  }, [success, handleCloseAddTransactionModal]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetTransactionState());
      }, 3000);
    }
  }, [error]);

  if (!wallet) {
    return <div>Wallet non trovato</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(AddTransaction(formData, wallet.id));
    setFormData({ volume: "", value: "", amount: "", date: "", exchange: "" });
  };

  /*const handleDeleteClick = (transactionIndex) => {
    setTransactionToDelete(transactionIndex);
    setShowDeleteModal(true);
  };

  const confirmDeleteTransaction = () => {
    // Logica per confermare l'eliminazione della transazione
    setTransactionToDelete(null);
    setShowDeleteModal(false);
  };

  const handleEditTransaction = (e) => {
    e.preventDefault();
    // Logica per modificare la transazione
    setShowEditTransactionModal(false);
  };*/

  const calculateSaldo = () => {
    return wallet.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  };

  const calculateTotaleInvestito = () => {
    return wallet.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.volume), 0);
  };

  /*const calculatePrezzoAcquistoMedio = () => {
    const totaleInvestito = calculateTotaleInvestito();
    const saldo = calculateSaldo();
    return totaleInvestito / saldo;
  };*/

  const calculatePrezzoAcquistoMedio = () => {
    const totaleVolumePesato = wallet.transactions.reduce(
      (sum, transaction) => sum + transaction.value * transaction.amount,
      0
    );
    const totaleQuantita = wallet.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    return totaleQuantita === 0 ? 0 : totaleVolumePesato / totaleQuantita;
  };

  const saldo = calculateSaldo();
  const totaleInvestito = calculateTotaleInvestito();
  const prezzoAcquistoMedio = calculatePrezzoAcquistoMedio();
  const base_ticker = wallet.currencyPair.baseTicker;
  const quote_ticker = wallet.currencyPair.quoteTicker;

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>{wallet.name}</h1>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="my-1 d-flex justify-content-between mb-3">
                <div>
                  Saldo: {saldo.toFixed(2)} {base_ticker}
                </div>
                <div>
                  Totale investito: {totaleInvestito.toFixed(2)} {quote_ticker}
                </div>
                <div>
                  Prezzo di acquisto medio: {prezzoAcquistoMedio.toFixed(2)} {quote_ticker}
                </div>
              </Card.Title>
            </Card.Body>
          </Card>
          <div className="my-1 d-flex justify-content-between align-items-center">
            <div>
              <h2>Transazioni</h2>
            </div>
            <div>
              <Button variant="primary" onClick={handleShowAddTransactionModal}>
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
              {wallet.transactions &&
                wallet.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.value}</td>
                    <td>{transaction.volume}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.exchange}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShowEditTransactionModal(transaction)}>
                        <LuPencil className="mb-1" size={16} />
                      </Button>
                      <Button variant="danger" onClick={() => handleShowDeleteModal(transaction)}>
                        <FaRegTrashCan className="mb-1" size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modale per aggiungere una nuova transazione */}
      <Modal show={showAddTransactionModal} onHide={handleCloseAddTransactionModal} className="my-5" animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Transazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit} className="my-2">
            {loading && <Spinner animation="border" />}
            {showErrorMessage && <Alert variant="danger">Errore!</Alert>}
            {showSuccessMessage && <Alert variant="success">Transazione aggiunta con successo!</Alert>}
            <Form.Group controlId="formValue">
              <Form.Label className="my-1">Prezzo di acquisto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci prezzo di acquisto"
                value={formData.value}
                name="value"
                onChange={handleChange}
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
                value={formData.volume}
                name="volume"
                onChange={handleChange}
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
                value={formData.amount}
                name="amount"
                onChange={handleChange}
                min="0"
                step="any"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label className="my-1">Data</Form.Label>
              <Form.Control type="date" value={formData.date} name="date" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formExchange">
              <Form.Label className="my-1">Exchange</Form.Label>
              <Form.Control type="text" value={formData.exchange} name="exchange" onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale per modificare una transazione */}
      {transactionToEdit && (
        <EditTransactionModal
          show={showEditTransactionModal}
          handleClose={handleCloseEditTransactionModal}
          transactionId={transactionToEdit.id}
          volume={transactionToEdit.volume}
          value={transactionToEdit.value}
          amount={transactionToEdit.amount}
          date={transactionToEdit.date}
          exchange={transactionToEdit.exchange}
        />
      )}

      {/* Modale per confermare l'eliminazione della transazione */}
      {transactionToDelete && (
        <DeleteTransactionModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          transactionId={transactionToDelete.id}
          walletId={wallet.id}
        />
      )}
    </Container>
  );
};

export default WalletDetail;
