import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

const Account = ({ accountData, updateAccount }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: accountData.username,
    email: accountData.email,
    password: "",
    firstName: accountData.firstName || "",
    lastName: accountData.lastName || "",
    birthDate: accountData.birthDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the updateAccount function passed as a prop
    updateAccount(formData);
    setShowModal(false);
  };

  return (
    <Container className="my-3">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Il tuo Profilo</h2>
          <div className="text-center mb-4">
            <img
              src={accountData.profileImage || "default-profile.png"}
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
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
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Modifica Dati
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
    </Container>
  );
};

export default Account;
