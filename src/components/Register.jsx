import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Le password non coincidono");
      return;
    }
    // Logica di registrazione
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Registrati</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
