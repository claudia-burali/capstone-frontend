import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Account = ({ accountData }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Account Details</h2>
          <p>
            <strong>Username:</strong> {accountData.username}
          </p>
          <p>
            <strong>Email:</strong> {accountData.email}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
