import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Modal } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6"; // Importa l'icona del cestino
import { Link, useParams } from "react-router-dom";

const WalletDetail = ({ wallets, deleteTransaction }) => {
  const { id } = useParams();
  const wallet = wallets.find((w) => w.id === parseInt(id));

  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
              <Button as={Link} to={`/wallets/${wallet.id}/add-transaction`} variant="primary">
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
                <th>Azione</th> {/* Aggiungi la colonna Azione */}
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
    </Container>
  );
};

export default WalletDetail;
