import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTransaction, resetTransactionState } from "../redux/actions/transaction";
import { useEffect, useState } from "react";

const DeleteTransactionModal = ({ show, handleClose, walletId, transactionId }) => {
  const dispatch = useDispatch();
  const confirmDeleteTransaction = () => {
    dispatch(DeleteTransaction(walletId, transactionId));
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
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetTransactionState());
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="my-5" animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">Errore!</Alert>}
          {showSuccessMessage && <Alert variant="success">Transazione eliminata con successo!</Alert>}Sei sicuro di
          voler eliminare questa transazione?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDeleteTransaction}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTransactionModal;
