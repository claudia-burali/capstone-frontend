import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { LuPencil } from "react-icons/lu";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateAccount, deleteAccount, fetchUser, uploadImage } from "../redux/actions/user";
import { useNavigate } from "react-router-dom";
import CapFooter from "./CapFooter";

const Account = ({ accountData, updateAccount, handleLogout, fetchUser }) => {
  const { error } = useSelector((state) => state.account);
  const [showImageModal, setShowImageModal] = useState(false);
  const { loading, success } = useSelector((state) => state.image);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSaveChanges = () => {
    if (!selectedFile) {
      alert("Per favore seleziona un'immagine prima di salvare.");
      return;
    }

    dispatch(uploadImage(selectedFile));
  };
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowImageModal(false);
      }, 3000);
    }
  }, [success, setShowImageModal]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    birthDate: "",
  });
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    // Caricare i dati dell'utente quando il componente è montato
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    // Aggiornare il form quando i dati dell'account cambiano
    if (accountData) {
      setFormData({
        username: accountData.username || "",
        email: accountData.email || "",
        name: accountData.name || "",
        surname: accountData.surname || "",
        birthDate: accountData.birthDate || "",
      });
      setAvatarURL(accountData.avatarURL || "");
    }
  }, [accountData]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount({ ...formData, avatarURL });
    setShowModal(false);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    if (!error) {
      handleLogout();
      setShowDeleteModal(false);
      navigate("/");
    }
  };

  if (!accountData) {
    return <div>Account eliminato!</div>; // Mostra un indicatore di caricamento o un messaggio di attesa
  }

  return (
    <>
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Il tuo Profilo</h2>
            <div className="d-flex gap-5 my-5">
              <div className="d-flex flex-column">
                <div className="mb-2">
                  <img
                    src={
                      avatarURL ||
                      "https://lh3.googleusercontent.com/n5VkLPYLHVzIOvT3t6U56xR28g1KFhO2U1PMCS1OLcM-loYSu4FihFLGA4hV_FcBMFdgf4skaXEN4GIETcFsT3rIm8DddCbLHsG0xg"
                    }
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div>
                  <Button variant="secondary" onClick={() => setShowImageModal(true)}>
                    <LuPencil className="mb-1" size={16} />
                  </Button>
                </div>
              </div>
              <div className="d-flex gap-5">
                <div>
                  <p>
                    <strong>Nome:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Cognome:</strong> {formData.surname}
                  </p>
                  <p>
                    <strong>Data di nascita:</strong> {formData.birthDate}
                  </p>
                  <p>
                    <strong>Username:</strong> {formData.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Password:</strong> ********
                  </p>
                </div>
                <div>
                  <Button variant="secondary" onClick={() => setShowModal(true)} className="mt-2">
                    <LuPencil className="mb-1" size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)} className="mt-2">
              Elimina Account
            </Button>
          </Col>
        </Row>

        {/* Modale per la modifica dei dati */}
        <Modal show={showModal} onHide={() => setShowModal(false)} className="my-5">
          <Modal.Header closeButton>
            <Modal.Title>Modifica Dati</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label className="my-1">Nome</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formSurname">
                <Form.Label className="my-1">Cognome</Form.Label>
                <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formBirthDate">
                <Form.Label className="my-1">Data di nascita</Form.Label>
                <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label className="my-1">Username</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="my-1">Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Salva
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modale per la conferma dell'eliminazione dell'account */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="my-5">
          <Modal.Header closeButton>
            <Modal.Title>Conferma Eliminazione Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sei sicuro di voler eliminare il tuo account? Questa azione non sarà reversibile.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Elimina
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modale per cambiare l'immagine del profilo */}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} className="my-5">
          <Modal.Header closeButton>
            <Modal.Title>Cambia Immagine del Profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formavAtarURL">
              {loading && <Spinner animation="border" />}
              {showSuccessMessage && <Alert variant="success">Immagine modificata!</Alert>}
              <Form.Label className="my-1">Seleziona una nuova immagine</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            {avatarURL && (
              <div className="mt-3 text-center">
                <img
                  src={avatarURL}
                  alt="New Profile"
                  className="img-fluid rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
            )}
            <Button variant="primary" onClick={handleSaveChanges} disabled={loading} className="mt-3">
              Salva
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
      <CapFooter />
    </>
  );
};

// Mappa lo stato di Redux ai props del componente
const mapStateToProps = (state) => ({
  accountData: state.account.user,
});

// Mappa le azioni di Redux ai props del componente
const mapDispatchToProps = {
  updateAccount,
  deleteAccount,
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
