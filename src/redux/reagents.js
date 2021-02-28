import * as ActionTypes from './ActionTypes';

export const Reagents = (state = {
    errMess: null,
    reagents: []
}, action) => {
    switch(action.type) {
        case ActionTypes.RENDER_REAGENTS:
            return {...state, isLoading: false, errMess: null, reagents: action.payload}

        case ActionTypes.REAGENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, reagents: []}

        case ActionTypes.ADD_REAGENTS:
            var reagent = action.payload;
            return {...state, reagents: state.reagents.concat(reagent)};
        default:
            return state;
    }
}