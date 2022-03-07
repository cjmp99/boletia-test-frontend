import { DELETE_EVENT, GET_EVENTS, SAVE_EVENT, SHOW_FOR_DELETE, SHOW_FOR_EDIT, UPDATE_EVENT, UPDATE_IMAGE_DESKTOP, UPDATE_IMAGE_MOBILE, UPDATE_IMAGE_TABLET } from "./types";

export const initialState = {
    event: null,
    error: null,
    events: [],
    message: null,
    titletoast: null,
    showmodal: false
}

export function BoletiaReducer(state = initialState, action){
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case SAVE_EVENT:
            return {
                ...state,
                message: action.message,
                titletoast: action.titletoast
            }

        case UPDATE_EVENT:
        case DELETE_EVENT:
        case UPDATE_IMAGE_DESKTOP:
        case UPDATE_IMAGE_TABLET:
        case UPDATE_IMAGE_MOBILE:
            return {
                ...state,
                message: action.message,
                titletoast: action.titletoast
            }

        case SHOW_FOR_EDIT:
            return {
                ...state,
                showmodal: action.showmodal,
                event: action.event
            }

        case SHOW_FOR_DELETE:
            return {
                ...state,
                confirmodal: action.confirmodal,
                event: action.event
            }
        
        default:
            return state
    }
}