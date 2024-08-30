import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CapFooter from "./CapFooter";

const Home = () => {
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <h1>Benvenuto su ExcelLent</h1>
            <p>
              Gestisci i tuoi investimenti in crypto con facilità! Abbandona i vecchi fogli di calcolo e utilizza un
              ✨fantastico✨ sistema nuovo ed intuitivo che ti permetterà di monitorare le tue transazioni in modo
              facile e veloce.
            </p>
          </Col>
        </Row>
      </Container>
      <CapFooter />
    </>
  );
};

export default Home;
