import React from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const WalletDetail = ({ wallets, addTransaction }) => {
  const { id } = useParams();
  const wallet = wallets.find((w) => w.id === parseInt(id));

  if (!wallet) {
    return <div>Wallet non trovato</div>;
  }

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1>{wallet.name}</h1>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Saldo: ${wallet.balance}</Card.Title>
              <Button as={Link} to={`/wallets/${wallet.id}/add-transaction`} variant="primary">
                Aggiungi Transazione
              </Button>
            </Card.Body>
          </Card>
          <h2>Transazioni</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Importo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {wallet.transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default WalletDetail;
