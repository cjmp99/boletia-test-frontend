import React, { useContext } from "react";
import {
  FaTicketAlt,
  FaDesktop,
  FaTablet,
  FaMobileAlt,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { default as TableComponent } from "react-bootstrap/Table";
import { ths } from "../../utils";
import BoletiaContext from "../../context/context";
import styles from './Table.css'
import useOnChangeValue from "../../hooks/useOnChangeValue";

const Table = () => {
  const { events, showModal, confirmModal } = useContext(BoletiaContext);
  const { setData } = useOnChangeValue();

  return (
    <TableComponent className={styles.table} responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          {ths.map((th, index) => (
            <th key={index}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {events.map((ev, key) => (
          <tr key={ev._id}>
            <td># {key + 1}</td>
            <td>{ev.name}</td>
            <td>{ev.dateEvent}</td>
            <td>{ev.hourEvent}</td>
            <td>
              <OverlayTrigger
                key={ev._id}
                placement={"right"}
                overlay={<Tooltip id={ev._id}>Buy Tickets</Tooltip>}
              >
                <a
                  href={ev.urlTickets}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTicketAlt size={20} />
                </a>
              </OverlayTrigger>
            </td>
            <td>
              <OverlayTrigger
                key={ev._id}
                placement={"right"}
                overlay={<Tooltip id={ev._id}>Show image desktop</Tooltip>}
              >
                <a
                  href={`${process.env.REACT_APP_BACKEND_URI_IMAGES}/${ev.bannerDesktop}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDesktop size={20} />
                </a>
              </OverlayTrigger>
            </td>
            <td>
              <OverlayTrigger
                key={ev._id}
                placement={"right"}
                overlay={<Tooltip id={ev._id}>Show image tablet</Tooltip>}
              >
                <a
                  href={`${process.env.REACT_APP_BACKEND_URI_IMAGES}/${ev.bannerTablet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTablet size={20} />
                </a>
              </OverlayTrigger>
            </td>
            <td>
              <OverlayTrigger
                key={ev._id}
                placement={"right"}
                overlay={<Tooltip id={ev._id}>Show image mobile</Tooltip>}
              >
                <a
                  href={`${process.env.REACT_APP_BACKEND_URI_IMAGES}/${ev.bannerMobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaMobileAlt size={20} />
                </a>
              </OverlayTrigger>
            </td>
            <td>
              <OverlayTrigger
                key={ev._id}
                placement={"bottom"}
                overlay={<Tooltip id={ev._id}>Edit event</Tooltip>}
              >
                <span onClick={() => showModal(false, setData, ev)}><FaEdit size={20} /></span>
              </OverlayTrigger>
            </td>
            <td>
              <OverlayTrigger
                key={ev._id}
                placement={"bottom"}
                overlay={<Tooltip id={ev._id}>Delete event</Tooltip>}
              >
                  <span className={styles.trash} onClick={() => confirmModal(false, ev._id)}><FaTrash color="red" size={20} /></span>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </TableComponent>
  );
};

export default Table;
