import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetwalletState, UpdateWallet } from "../redux/actions/wallet";

const EditWalletModal = ({ name, currencyPair, show, handleClose, contentPair, id }) => {
  const [formData, setFormData] = useState({ name: "", currencyPairName: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({ name: name, currencyPairName: currencyPair });
  }, [name, currencyPair]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateWallet(formData, id));
    dispatch(resetwalletState());
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="my-5">
        <Modal.Header closeButton>
          <Modal.Title>Modifica Nome Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEditName">
              <Form.Label className="my-1">Nuovo nome del Wallet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nuovo nome"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditCurrencyPair">
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
            <Button variant="secondary" type="submit" className="mt-3">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditWalletModal;
