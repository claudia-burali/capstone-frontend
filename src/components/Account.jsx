import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { LuPencil } from "react-icons/lu";

const Account = ({ accountData, updateAccount, deleteAccount }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formData, setFormData] = useState({
    username: accountData.username,
    email: accountData.email,
    password: "",
    firstName: accountData.firstName || "",
    lastName: accountData.lastName || "",
    birthDate: accountData.birthDate || "",
  });
  const [profileImage, setProfileImage] = useState(accountData.profileImage || "");

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
    setShowImageModal(false);
  };

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
                  <strong>Nome:</strong> {accountData.firstName}
                </p>
                <p>
                  <strong>Cognome:</strong> {accountData.lastName}
                </p>
                <p>
                  <strong>Data di nascita:</strong> {accountData.birthDate}
                </p>
                <p>
                  <strong>Username:</strong> {accountData.username}
                </p>
                <p>
                  <strong>Email:</strong> {accountData.email}
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
            <Form.Group controlId="formFirstName">
              <Form.Label className="my-1">Nome</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label className="my-1">Cognome</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
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

export default Account;
