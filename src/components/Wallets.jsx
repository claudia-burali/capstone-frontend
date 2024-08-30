import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal, Spinner, Alert } from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrAdd } from "react-icons/gr";
import { LuPencil } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCurrencyPair } from "../redux/actions/currencyPair";
import { AddWallet, resetwalletState } from "../redux/actions/wallet";
import EditWalletModal from "./EditWalletModal";
import DeleteWalletModal from "./DeleteWalletModal";

const Wallets = () => {
  const [formData, setFormData] = useState({
    name: "",
    currencyPairName: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyPair());
  }, [dispatch]);

  const { contentPair } = useSelector((state) => state.currencyPair);
  const { content } = useSelector((state) => state.authentication);
  const [walletToEdit, setWalletToEdit] = useState(null);
  const [walletToDelete, setWalletToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (wallet) => {
    setWalletToEdit(wallet);
    setShowEditModal(true);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (wallet) => {
    setWalletToDelete(wallet);
    setShowDeleteModal(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(AddWallet(formData));
    setFormData({ name: "", currencyPairName: "" });
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { loading, success, error } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetwalletState());
        handleCloseAddModal();
      }, 3000);
    }
  }, [success, handleCloseAddModal]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetwalletState());
      }, 3000);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Funzione per calcolare il saldo di un wallet
  const calculateSaldo = (wallet) => {
    return wallet.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  };

  return (
    <Container className="my-4">
      <div className="my-1 d-flex justify-content-between align-items-center">
        <div>
          <h2>Riepilogo investimenti: </h2>
        </div>
        <div>
          <Button variant="primary" onClick={handleShowAddModal}>
            <GrAdd className="mb-1" size={20} />
          </Button>
        </div>
      </div>
      <Row className="my-3">
        <Col>
          {content &&
            content.wallets.map((wallet) => (
              <Card key={wallet.id} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {wallet.name} {wallet.currencyPair.name}
                      </div>
                      <div>
                        <Button variant="secondary" className="ml-2" onClick={() => handleShowEditModal(wallet)}>
                          <LuPencil className="mb-1" size={16} />
                        </Button>
                        <Button variant="danger" className="ml-2" onClick={() => handleShowDeleteModal(wallet)}>
                          <FaRegTrashCan className="mb-1" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card.Title>
                  <Card.Text>
                    Saldo: {calculateSaldo(wallet).toFixed(2)} {wallet.currencyPair.baseTicker}
                  </Card.Text>
                  <Link to={`/wallets/${wallet.id}`} className="btn btn-primary">
                    Dettagli
                  </Link>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>

      {/* Modale per aggiungere un nuovo wallet */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} className="my-5" animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi nuovo Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            {loading && <Spinner animation="border" />}
            {showErrorMessage && <Alert variant="danger">Errore!</Alert>}
            {showSuccessMessage && <Alert variant="success">Wallet aggiunto con successo!</Alert>}
            <Form.Group controlId="formName">
              <Form.Label className="my-1">Nome del Wallet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1">Coppia di valute</Form.Label>
              <Form.Select name="currencyPairName" value={formData.currencyPairName} onChange={handleChange}>
                <option>Seleziona una coppia di valute</option>
                {contentPair &&
                  contentPair.map((currencyName) => (
                    <option key={currencyName.id} value={currencyName.name}>
                      {currencyName.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale per la modifica del wallet */}
      {walletToEdit && (
        <EditWalletModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          name={walletToEdit.name}
          currencyPair={walletToEdit.currencyPair.name}
          id={walletToEdit.id}
          contentPair={contentPair}
        />
      )}

      {/* Modale per confermare l'eliminazione del wallet */}
      {walletToDelete && (
        <DeleteWalletModal show={showDeleteModal} handleClose={handleCloseDeleteModal} id={walletToDelete.id} />
      )}
    </Container>
  );
};

export default Wallets;
