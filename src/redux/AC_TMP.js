import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';
import { TestTypes } from './testTypes';

// GET
export const fetchReagents = () => (dispatch) => {
    return fetch(baseUrl + 'reagents')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(reagents => dispatch(renderReagents(reagents)))
        .catch(error => dispatch(reagentsFailed(error.message)));
}

export const reagentsLoading = () => ({
    type: ActionTypes.REAGENTS_LOADING
});

export const renderReagents = (reagents) => ({
    type: ActionTypes.RENDER_REAGENTS,
    payload: reagents
});

export const reagentsFailed = (errmess) => ({
    type: ActionTypes.REAGENTS_FAILED,
    payload: errmess
});

// POST
export const postReagent = (
    unit,
    reagentName,
    supplier,
    lotNr,
    catNr,
    expiryDate,
    dateReceived,
    storageLocation
) => (dispatch) => {

    const newReagent = {
        unit: unit,
        reagentName: reagentName,
        supplier: supplier,
        lotNr: lotNr,
        catNr: catNr,
        expiryDate: expiryDate,
        dateReceived: dateReceived,
        storageLocation: storageLocation
    }
    
    return fetch(baseUrl + 'reagents', {
        method: 'POST',
        body: JSON.stringify(newReagent),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addReagent(response)))
        .catch(error => { console.log('Post reagents', error.message) 
            alert('Reagent could not be posted\nError: '+ error.message)})
}

export const addReagent = (reagent) => ({
    type: ActionTypes.ADD_REAGENT,
    payload: reagent
});

// PUT
export const putReagent = (
    updatedReagent, action
) => (dispatch) => {
    
    return fetch(baseUrl + 'reagents/' + updatedReagent._id 
    + "?action=" + action, {
        method: 'PUT',
        body: JSON.stringify(updatedReagent),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {dispatch(updateReagent(response))})
        .catch(error => { console.log('Post reagents', error.message) 
            alert('Reagent could not be posted\nError: '+ error.message)})
}

export const updateReagent = (reagent) => ({
    type: ActionTypes.UPDATE_REAGENT,
    payload: reagent
});

export const deleteReagent = (
    reagent_id
) => (dispatch) => {
    
    return fetch(baseUrl + 'reagents/' + reagent_id, {
        method: 'DELETE',
        credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {dispatch(removeReagents(response))})
        .catch(error => { console.log('Delete reagents', error.message) 
            alert('Reagent could not be deleted\nError: '+ error.message)})
        
}

export const removeReagent = (reagent) => ({    
    type: ActionTypes.REMOVE_REAGENTS,
    payload: reagent
});