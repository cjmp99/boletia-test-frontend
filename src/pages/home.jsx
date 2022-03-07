import React, { useContext, useEffect, useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import ConfirmDelete from "../components/ConfirmDelete";
import FormEvent from "../components/FormEvent";
import Layout from "../components/Layout";
import Table from "../components/Table";
import BoletiaContext from "../context/context";

const Home = () => {
  const [showToast, setShowToast] = useState(false);

  const { titletoast, message, showModal } = useContext(BoletiaContext);
  const toggleShowA = () => setShowToast(!showToast);

  useEffect(() => {
    if (!message) return;
    setShowToast(true);
  }, [message]);

  return (
    <Layout>
      <ToastContainer position="top-end" className="p-3">
        <Toast position="top-end" show={showToast} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{titletoast}</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Button variant="primary" onClick={() => showModal(false)}>
        Create Event
      </Button>
      <Table />
      <FormEvent />
      <ConfirmDelete />
    </Layout>
  );
};

export default Home;
