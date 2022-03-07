import React, { useContext } from "react";
import { Button, Navbar, Container } from "react-bootstrap";
import BoletiaContext from "../../context/context";

const Header = () => {
  const { showModal } = useContext(BoletiaContext);

  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="/">Boletia / Banners</Navbar.Brand>
        <Button variant="primary" onClick={() => showModal(false)}>
          Create Event
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
