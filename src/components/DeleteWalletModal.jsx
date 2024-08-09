import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteWallet, resetwalletState } from "../redux/actions/wallet";
import { useEffect, useState } from "react";

const DeleteWalletModal = ({ show, handleClose, id }) => {
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => state.wallet);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleDelete = () => {
    dispatch(DeleteWallet(id));
  };

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetwalletState());
        handleClose();
      }, 3000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetwalletState());
      }, 3000);
    }
  }, [error, dispatch]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="my-5" animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">Errore!</Alert>}
          {showSuccessMessage && <Alert variant="success">Wallet eliminato con successo!</Alert>} Sei sicuro di voler
          eliminare questo wallet?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteWalletModal;
