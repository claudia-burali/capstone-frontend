import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Auth = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      onLogin(email, password);
      navigate("/wallets"); // Redirect to wallets after login
    } else {
      onRegister(username, email, password);
      navigate("/auth"); // Redirect to login after registration
      setIsLogin(true);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>{isLogin ? "Accedi" : "Benvenuto su ExelLense"}</h2>
          <Form className="my-3" onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="my-2" controlId="formUsername">
                <Form.Label className="my-1">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome utente"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="my-2" controlId="formEmail">
              <Form.Label className="my-1">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci l'email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="formPassword">
              <Form.Label className="my-1">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLogin ? "Accedi" : "Registrati"}
            </Button>
            <Button variant="link" onClick={toggleForm} className="mt-3">
              {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
