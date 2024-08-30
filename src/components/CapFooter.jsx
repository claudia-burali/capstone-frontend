import { Container, Row, Col, Dropdown } from "react-bootstrap";

function CapFooter() {
  return (
    <Container id="footer" className="py-5 mt-3 fixed-bottom">
      <Row>
        <Col>
          <a className="fotLink" href="#a">
            Informazioni
          </a>
          <a className="fotLink" href="#b">
            Linee guida della community
          </a>
          <Dropdown>
            <a className="fotLink" href="#c">
              <Dropdown.Toggle variant="outline" id="dropdown-basic" className="priDrop fotLink">
                Privacy e condizioni
              </Dropdown.Toggle>
            </a>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#">Informativa sulla privacy</Dropdown.Item>
              <Dropdown.Item href="#">Contratto di licenza</Dropdown.Item>
              <Dropdown.Item href="#">Termini e condizioni delle pagine</Dropdown.Item>
              <Dropdown.Item href="#">Informativa sui cookie</Dropdown.Item>
              <Dropdown.Item href="#">Informativa sul copyright</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <a className="fotLink" href="#d">
            Sales Solutions
          </a>
          <a className="fotLink" href="#e">
            Centro sicurezza
          </a>
        </Col>
        <Col>
          <a className="fotLink" href="#f">
            Accessibilità
          </a>
          <a className="fotLink" href="#g">
            Carriera
          </a>
          <a className="fotLink" href="#h">
            Opzioni per gli annunci pubblicitari
          </a>
          <a className="fotLink" href="#i">
            Mobile
          </a>
        </Col>
        <Col>
          <a className="fotLink" href="#j">
            Talent Solutions
          </a>
          <a className="fotLink" href="#k">
            Soluzioni di marketing
          </a>
          <a className="fotLink" href="#l">
            Pubblicità
          </a>
          <a className="fotLink" href="#m">
            Piccole imprese
          </a>
        </Col>
        <Col xs={3} className="lineheight">
          <div>
            <div className="d-flex gap-2 align-items-center">
              <div className="fotIcon">
                <i className="bi bi-question-circle-fill"></i>
              </div>
              <div>
                <a className="fotLink fotLinkIcon" href="#n">
                  Domande?
                </a>
                <p>Visita il nostro centro assistenza.</p>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>
                <i className="bi bi-gear-fill"></i>
              </div>
              <div>
                <a className="fotLink fotLinkIcon" href="#o">
                  Gestisci il tuo account e la tua privacy
                </a>
                <p>Vai alle impostazioni</p>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>
                <i className="bi bi-shield-shaded"></i>
              </div>
              <div>
                <a className="fotLink fotLinkIcon" href="#p">
                  Trasparenza sui contenuti consigliati
                </a>
                <p>Scopri di più sui contenuti consigliati.</p>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <p>Selezione lingua</p>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="langDrop">
              Italiano (Italiano)
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#">English</Dropdown.Item>
              <Dropdown.Item href="#">Spanish</Dropdown.Item>
              <Dropdown.Item href="#">German</Dropdown.Item>
              <Dropdown.Item href="#">French</Dropdown.Item>
              <Dropdown.Item href="#">Japanese</Dropdown.Item>
              <Dropdown.Item href="#">Dutch</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p>ExcelLent Corporation © 2024</p>
        </Col>
      </Row>
    </Container>
  );
}

export default CapFooter;
