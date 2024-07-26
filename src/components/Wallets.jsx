import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Wallets = ({ wallets, addWallet, editWalletName, deleteWallet }) => {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [walletIdToEdit, setWalletIdToEdit] = useState(null);
  const [walletIdToDelete, setWalletIdToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      const newWallet = { name, balance: 0, transactions: [] };
      addWallet(newWallet);
      setName("");
      setShowAddModal(false);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editName.trim() !== "") {
      editWalletName(walletIdToEdit, editName);
      setWalletIdToEdit(null);
      setEditName("");
      setShowEditModal(false);
    }
  };

  const handleDeleteSubmit = () => {
    deleteWallet(walletIdToDelete);
    setWalletIdToDelete(null);
    setShowDeleteModal(false);
  };

  const startEditing = (walletId, currentName) => {
    setWalletIdToEdit(walletId);
    setEditName(currentName);
    setShowEditModal(true);
  };

  const startDeleting = (walletId) => {
    setWalletIdToDelete(walletId);
    setShowDeleteModal(true);
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
                <Button variant="secondary" onClick={() => startEditing(wallet.id, wallet.name)} className="ml-2">
                  <i class="bi bi-pencil"></i>
                </Button>
                <Button variant="danger" onClick={() => startDeleting(wallet.id)} className="ml-2">
                  <i class="bi bi-trash3"></i>
                </Button>
                <Card.Text>Saldo: {wallet.balance}</Card.Text>
                <Link to={`/wallets/${wallet.id}`} className="btn btn-primary">
                  Dettagli
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Aggiungi Wallet
          </Button>
        </Col>
      </Row>

      {/* Modale per aggiungere un nuovo wallet */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi nuovo Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
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
        </Modal.Body>
      </Modal>

      {/* Modale per modificare il nome del wallet */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Nome Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale per confermare l'eliminazione del wallet */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo wallet?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Wallets;
