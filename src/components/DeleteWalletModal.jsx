import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteWallet } from "../redux/actions/wallet";
import { fetchProtectedResource } from "../redux/actions/user";

const DeleteWalletModal = ({ show, handleClose, id }) => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(DeleteWallet(id));
    dispatch(fetchProtectedResource());
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="my-5">
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo wallet?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteWalletModal;
