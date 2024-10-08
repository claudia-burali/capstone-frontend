import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/user";
import { useNavigate } from "react-router-dom";

const Auth = ({ onLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthDate: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const toggleFormRegister = () => setIsLogin(false);
  const toggleFormLogin = () => setIsLogin(true);
  const { success, error: authError } = useSelector((state) => state.authentication);
  const { success1, error: registerError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin && success) {
      onLogin(formData.email, formData.password);
      navigate("/wallets");
    } else if (!isLogin && success1) {
      toggleFormLogin();
    }
  }, [success, success1, isLogin, navigate, onLogin, formData.email, formData.password]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    } else if (registerError) {
      setError(registerError);
    } else {
      setError(null);
    }
  }, [authError, registerError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const { email, password } = formData;
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser(formData));
      onRegister(formData.username, formData.email, formData.password);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>{isLogin ? "Accedi" : "Benvenuto su ExelLens"}</h2>
          {error && <Alert variant="danger">Errore!{error}</Alert>}
          <Form className="my-3" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <Form.Group className="my-2">
                  <Form.Label className="my-1">Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="my-2">
                  <Form.Label className="my-1">Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo cognome"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="my-2">
                  <Form.Label className="my-1">Data di nascita</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Inserisci la tua data di nascita"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="my-2">
                  <Form.Label className="my-1">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il nome utente"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="my-2">
              <Form.Label className="my-1">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci l'email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label className="my-1">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLogin ? "Accedi" : "Registrati"}
            </Button>
            {isLogin ? (
              <Button variant="link" onClick={toggleFormRegister} className="mt-3">
                Non hai un account? Registrati
              </Button>
            ) : (
              <Button variant="link" onClick={toggleFormLogin} className="mt-3">
                Hai già un account? Accedi
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
