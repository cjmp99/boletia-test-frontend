import { useContext, useState } from "react";
import BoletiaContext from "../context/context";

const useHandleSubmit = (eventObj, data, setData, showModal) => {
    const [validated, setValidated] = useState(false);

    const { saveEvent, editEvent } = useContext(BoletiaContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.stopPropagation();
        } else {
            showModal(true, setData)
            !eventObj ? saveEvent(data) : editEvent(data, eventObj._id)
        }

        setValidated(true);
    };

    return {
        validated,
        handleSubmit,
    };
};

export default useHandleSubmit;
