import API_URL from '../apiConfig.js'
import React from 'react'
import { Navbar, Nav, Container , Modal, Button } from "react-bootstrap";

export default function Footer() {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Horizon Team 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This site created by © Horizon Team  2021-1 </p>
          <p>Members:</p>
          <ul>

            <li>
            <h6>Meznah Alamry</h6>
              <a href="#">Linked In</a><br/>
              <a href="https://git.generalassemb.ly/meznah" target="_blank">Github</a><br/>
              </li>

              <li>
              <h6>Tala Alghamdi</h6>
              <a href="https://www.linkedin.com/in/tala-alghamdi" target="_blank">Linked In</a><br/>
              <a href="https://git.generalassemb.ly/talamajed" target="_blank">Github</a><br/>
            </li>

            <li>
              <h6>Asim Sami</h6>
              <a href="https://www.linkedin.com/in/asim-sami-software-engineer/" target="_blank">Linked In</a><br/>
              <a href="https://git.generalassemb.ly/asim-sami" target="_blank">Github</a><br/>
            </li>

          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  
    return (
        <div className="Footer">
        <Navbar className="navbar footer-bar" variant="dark">
        <Container >
        <Nav className="mr-auto nav-bar-elements">
          <Nav.Link href="#home" 
          onClick={() => setModalShow(true)}
          >Contact Us</Nav.Link>
          <Nav.Link href="#features"></Nav.Link>
          <Nav.Link href="#pricing"></Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
      
    )
}
