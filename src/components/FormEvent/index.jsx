import { useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import BoletiaContext from "../../context/context";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import useOnChangeValue from "../../hooks/useOnChangeValue";
import UpdateImages from "../UpdateImages";

const FormEvent = () => {
  const { event, showmodal, showModal } = useContext(BoletiaContext);
  const { errorFiles, data, setData, onChange } = useOnChangeValue();
  const { validated, handleSubmit } = useHandleSubmit(
    event,
    data,
    setData,
    showModal
  );

  return (
    <Modal show={showmodal} onHide={() => showModal(true, setData)}>
      <Modal.Header closeButton>
        <Modal.Title>{!event ? "Create" : "Edit"} Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name Event</Form.Label>
            <Form.Control
              name="name"
              onChange={onChange}
              required
              type="text"
              placeholder="Enter name event"
              value={data.name}
            />
            <Form.Control.Feedback type="invalid">
              Event name cannot be empty
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date | Hour Event</Form.Label>
            <Form.Control
              name="date"
              onChange={onChange}
              required
              type="datetime-local"
              value={data.date}
            />
            <Form.Control.Feedback type="invalid">
              You must add a valid date and time for the event
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" hasValidation>
            <Form.Label>Url Buy Tickets</Form.Label>
            <Form.Control
              isInvalid={errorFiles.invalidUrl ? true : false}
              name="urlTickets"
              onChange={onChange}
              required
              type="text"
              value={data.urlTickets}
            />
            <Form.Control.Feedback type="invalid">
              You must add a valid url to purchase tickets
            </Form.Control.Feedback>
          </Form.Group>
          {!event ? (
            <>
              <Form.Group className="mb-3" controlId="formBasicPassword" hasValidation>
                <Form.Label>Image Desktop</Form.Label>
                <Form.Control
                  isInvalid={errorFiles.bannerDesktop ? true : false}
                  onChange={(e) =>
                    setData({ ...data, bannerDesktop: e.target.files[0] })
                  }
                  required
                  type="file"
                />
                <Form.Control.Feedback type="invalid">
                  {errorFiles.bannerDesktop ? errorFiles.bannerDesktop : "You must upload a desktop image"}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword" hasValidation>
                <Form.Label>Image Tablet</Form.Label>
                <Form.Control
                  isInvalid={errorFiles.bannerTablet ? true : false}
                  onChange={(e) =>  setData({ ...data, bannerTablet: e.target.files[0] })}
                  required
                  type="file"
                />
                <Form.Control.Feedback type="invalid">
                  {errorFiles.bannerTablet ? errorFiles.bannerTablet : "You must upload a tablet image"}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword" hasValidation>
                <Form.Label>Image Mobile</Form.Label>
                <Form.Control
                  isInvalid={errorFiles.bannerMobile ? true : false}
                  onChange={(e) =>
                    setData({ ...data, bannerMobile: e.target.files[0] })
                  }
                  required
                  type="file"
                />
                <Form.Control.Feedback type="invalid">
                  {errorFiles.bannerMobile ? errorFiles.bannerMobile : "You must upload a mobile image"}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          ) : (
            <UpdateImages />
          )}
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => showModal(true, setData)}
            >
              Close
            </Button>
            <Button variant="primary" type={"submit"}>
              {!event ? "Save Changes" : "Edit Event"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormEvent;
