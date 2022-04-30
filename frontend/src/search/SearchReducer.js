import { ACTIONS } from "./Constants";

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE:
            return { ...state, make: action.payload, model: '' }
        case ACTIONS.MODEL:
            return { ...state, model: action.payload }
        case ACTIONS.YEAR:
            return { ...state, year: action.payload }
        case ACTIONS.PRICE:
            return { ...state, price: action.payload }
        default:
            return state;
    }
}