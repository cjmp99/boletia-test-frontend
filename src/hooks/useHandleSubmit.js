import { useContext, useState } from "react";
import BoletiaContext from "../context/context";
import useOnChangeValue from "./useOnChangeValue";

const useHandleSubmit = (eventObj, data, setData, showModal) => {
    const [validated, setValidated] = useState(false);
    const { errorFiles } = useOnChangeValue()
    const { saveEvent, editEvent } = useContext(BoletiaContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(errorFiles.bannerDesktop || errorFiles.bannerTablet || errorFiles.bannerMobile || errorFiles.invalidUrl) return;
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
