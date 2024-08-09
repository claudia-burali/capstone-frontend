import { useState, useEffect } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetTransactionState, UpdateTransaction } from "../redux/actions/transaction";
import { fetchProtectedResource } from "../redux/actions/user";

const EditTransactionModal = ({ show, handleClose, transactionId, volume, value, amount, date, exchange }) => {
  const [formData, setFormData] = useState({
    volume: volume,
    value: value,
    amount: amount,
    date: date,
    exchange: exchange,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      volume: volume,
      value: value,
      amount: amount,
      date: date,
      exchange: exchange,
    });
  }, [volume, value, amount, date, exchange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateTransaction(formData, transactionId));
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
          <Modal.Title>Modifica Transazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit} className="my-2">
            {loading && <Spinner animation="border" />}
            {showErrorMessage && <Alert variant="danger">Errore!</Alert>}
            {showSuccessMessage && <Alert variant="success">Transazione modificata con successo!</Alert>}
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
    </>
  );
};

export default EditTransactionModal;
