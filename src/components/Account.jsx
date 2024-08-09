import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { LuPencil } from "react-icons/lu";
import { connect } from "react-redux";
import { updateAccount, deleteAccount, fetchUser } from "../redux/actions/user";

const Account = ({ accountData, updateAccount, deleteAccount, fetchUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    birthDate: "",
  });
  const [profileImage, setProfileImage] = useState("");

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
      setProfileImage(accountData.profileImage || "");
    }
  }, [accountData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount({ ...formData, profileImage });
    setShowModal(false);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    setShowDeleteModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    updateAccount({ ...formData, profileImage });
    setShowImageModal(false);
  };

  if (!accountData) {
    return <div>Loading...</div>; // Mostra un indicatore di caricamento o un messaggio di attesa
  }

  return (
    <Container className="my-3">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Il tuo Profilo</h2>
          <div className="d-flex gap-5 my-5">
            <div className="d-flex flex-column">
              <div className="mb-2">
                <img
                  src={
                    profileImage ||
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

            <Form.Group controlId="formPassword">
              <Form.Label className="my-1">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Lascia vuoto se non vuoi cambiare la password"
              />
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
          <Form onSubmit={handleImageSubmit}>
            <Form.Group controlId="formProfileImage">
              <Form.Label className="my-1">Seleziona una nuova immagine</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            {profileImage && (
              <div className="mt-3 text-center">
                <img
                  src={profileImage}
                  alt="New Profile"
                  className="img-fluid rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
            )}
            <Button variant="primary" type="submit" className="mt-3">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
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
