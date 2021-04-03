import * as ActionTypes from './ActionTypes';

export const SecReagents = (state = {
    errMess: null,
    secReagents: []
}, action) => {
    switch(action.type) {
        case ActionTypes.RENDER_SEC_REAGENTS:
            console.log(action.payload);
            return {...state, isLoading: false, errMess: null, secReagents: action.payload}
        
        case ActionTypes.SEC_REAGENTS_LOADING:
            return {...state, isLoading: true, errMess: null, secReagents: []}

        case ActionTypes.SEC_REAGENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, secReagents: []}

        case ActionTypes.UPDATE_SEC_REAGENT:
            var secReagent = action.payload;
            if (secReagent.status == "DELETED") {
                return {...state, secReagents: state.secReagents.filter(
                    item => item._id !== secReagent._id
                )};
            }
            else {
                var reagentsCopy = state.secReagents.slice()
                var foundIndex = reagentsCopy.findIndex(entry => entry._id == secReagent._id);
                reagentsCopy[foundIndex] = secReagent;
                
                return {...state, secReagents: reagentsCopy}
            }
       
        case ActionTypes.REMOVE_SEC_REAGENT:
            var secReagent = action.payload._id;
            return {...state, secReagents: state.secReagents.filter(
                item => item._id !== secReagent
            )};

        default:
            return state;
    }
}