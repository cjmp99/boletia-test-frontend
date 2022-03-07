import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import BoletiaContext from "../../context/context";

const ConfirmDelete = () => {
    const { event, confirmodal, confirmModal, deleteEvent } = useContext(BoletiaContext);

    const fetchDeleteEvent = () => {
        deleteEvent(event?._id)
        confirmModal(true)
    }

    return (
        <Modal show={confirmodal} onHide={() => confirmModal(true)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure delete event?</p>
                <Modal.Footer>
                    <Button
                    variant="secondary"
                    onClick={() => confirmModal(true)}
                    >
                    Close
                    </Button>
                    <Button variant="primary" onClick={fetchDeleteEvent}>
                    Delete Event
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmDelete;
