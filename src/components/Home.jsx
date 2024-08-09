import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Welcome to ExcelLent</h1>
          <p>
            Tired of these sheets? Trade your old calc sheets for an ✨excellent✨ new system. It'll feel like magic.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
