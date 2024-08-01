import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Benvenuto in Crypto Tracker</h1>
          <p>
            Questa applicazione ti permette di tracciare i tuoi investimenti in criptovalute, gestire i tuoi wallet e
            monitorare le transazioni.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
