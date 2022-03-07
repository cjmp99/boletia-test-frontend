import { useEffect, useReducer } from 'react';
import axios from 'axios';
import BoletiaContext from '../context/context';
import { BoletiaReducer, initialState } from './reducer';

const URL = process.env.REACT_APP_BACKEND_URI;

const BoletiaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BoletiaReducer, initialState);

    const showModal = (showmodal, setData, event = null) => {
        if(setData){
            setData({
                name: '',
                date: '',
                urlTickets: '',
                bannerDesktop: null,
                bannerTablet: null,
                bannerMobile: null
            })
        dispatch({ type: 'SHOW_FOR_EDIT', showmodal: !showmodal, event: null })
        }
        dispatch({ type: 'SHOW_FOR_EDIT', showmodal: !showmodal, event: event })
    }

    const confirmModal = (confirmodal, event_id = null) => {
        dispatch({ type: 'SHOW_FOR_DELETE', confirmodal: !confirmodal, event_id: event_id })
    }

    const getListEvents = async () => {
        try {
            const response = await axios.get(`${URL}/banners`);
            dispatch({ type: 'GET_EVENTS', payload: response.data.banners.docs })
        } catch (error) {
            console.log(error);
        }
    }

    const saveEvent = async (data) => {
        const formdata = new FormData();
        formdata.append('name', data.name);
        formdata.append('date', data.date);
        formdata.append('urlTickets', data.urlTickets);
        formdata.append('bannerDesktop', data.bannerDesktop);
        formdata.append('bannerTablet', data.bannerTablet);
        formdata.append('bannerMobile', data.bannerMobile);
        try {
            const response = await axios.post(`${URL}/save-event`, formdata);

            dispatch({type: 'SAVE_EVENT', message: response.data.message, titletoast: 'Created successfully'})
            getListEvents()
        } catch (error) {
            console.log(error);
        }
    }

    const editEvent = async (data, id) => {
        const formdata = new FormData();
        formdata.append('name', data.name);
        formdata.append('date', data.date);
        formdata.append('urlTickets', data.urlTickets);
        formdata.append('bannerDesktop', data.bannerDesktop);
        formdata.append('bannerTablet', data.bannerTablet);
        formdata.append('bannerMobile', data.bannerMobile);
        try {
            const response = await axios.put(`${URL}/banner/${id}`, formdata);

            dispatch({type: 'UPDATE_EVENT', message: response.data.message, titletoast: 'Edit successfully'})
            getListEvents()
        } catch (error) {
            console.log(error);
        }
    }

    const replaceImageDesktop = async (bannerDesktop, id) => {
        const formdata = new FormData();
        formdata.append('bannerDesktop', bannerDesktop);

        try {
            const response = await axios.put(`${URL}/update-image-desktop/${id}`, formdata);

            dispatch({type: 'UPDATE_IMAGE_DESKTOP', message: response.data.message, titletoast: 'Edit successfully'})
            getListEvents()
        } catch (error) {
            console.log(error);
        }
    }

    const replaceImageTablet = async (bannerTablet, id) => {
        const formdata = new FormData();
        formdata.append('bannerTablet', bannerTablet);

        try {
            const response = await axios.put(`${URL}/update-image-tablet/${id}`, formdata);

            dispatch({type: 'UPDATE_IMAGE_TABLET', message: response.data.message, titletoast: 'Edit successfully'})
            getListEvents()
        } catch (error) {
            console.log(error);
        }
    }

    const replaceImageMobile = async (bannerMobile, id) => {
        const formdata = new FormData();
        formdata.append('bannerMobile', bannerMobile);

        try {
            const response = await axios.put(`${URL}/update-image-mobile/${id}`, formdata);

            dispatch({type: 'UPDATE_IMAGE_MOBILE', message: response.data.message, titletoast: 'Edit successfully'})
            getListEvents()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEvent = async (id) => {
        try {
            const response = await axios.delete(`${URL}/banner/${id}`);

            dispatch({type: 'DELETE_EVENT', message: response.data.message, titletoast: 'Delete event successfully'})
            getListEvents()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(state.events.length !== 0) return
        getListEvents()

        //eslint-disable-next-line
    }, [])
    

    return (
        <BoletiaContext.Provider
            value={{
                events: state.events,
                message: state.message,
                titletoast: state.titletoast,
                showmodal: state.showmodal,
                event: state.event,
                event_id: state.event_id,
                confirmodal: state.confirmodal,
                saveEvent,
                getListEvents,
                showModal,
                editEvent,
                replaceImageDesktop,
                replaceImageTablet,
                replaceImageMobile,
                deleteEvent,
                confirmModal
            }}
        >
            {children}
        </BoletiaContext.Provider>
    )
}

export default BoletiaProvider;
