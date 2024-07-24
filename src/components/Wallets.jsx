import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Wallets = ({ wallets }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>I Miei Wallets</h1>
          {wallets.map((wallet, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{wallet.name}</Card.Title>
                <Card.Text>Bilancio: ${wallet.balance}</Card.Text>
                <Button as={Link} to={`/wallets/${wallet.id}`} variant="primary">
                  Dettagli
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Wallets;
