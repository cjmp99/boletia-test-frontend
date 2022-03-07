import { useContext, useEffect, useState } from "react"
import BoletiaContext from "../context/context";

const useOnChangeValue = () => {
    const { event } = useContext(BoletiaContext);

    const [data, setData] = useState({
        name: '',
        date: '',
        urlTickets: '',
        bannerDesktop: null,
        bannerTablet: null,
        bannerMobile: null
    });

    useEffect(() => {
        if(!event) return;

        setData({
            ...data,
            name: event.name,
            date: `${event.dateEvent}T${event.hourEvent}`,
            urlTickets: event.urlTickets
        })
        //eslint-disable-next-line
    }, [event])
    

    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return {
        data,
        setData,
        onChange
    }
}

export default useOnChangeValue;