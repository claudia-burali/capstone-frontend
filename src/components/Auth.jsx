import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Auth = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(username, email, password);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>{isLogin ? "Login" : "Registrazione"}</h2>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group controlId="formUsername">
                <Form.Label>Nome Utente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome utente"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            )}
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
            <Button variant="primary" type="submit">
              {isLogin ? "Login" : "Registrati"}
            </Button>
            <Button variant="link" onClick={handleSwitch}>
              {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
