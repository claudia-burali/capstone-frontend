import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteTransaction } from "../redux/actions/transaction";

const DeleteTransactionModal = ({ show, handleClose, walletId, transactionId }) => {
  const dispatch = useDispatch();
  const confirmDeleteTransaction = () => {
    dispatch(DeleteTransaction(walletId, transactionId));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="my-5">
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questa transazione?</Modal.Body>
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
