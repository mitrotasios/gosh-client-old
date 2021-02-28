import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';

export const addReagents = (reagents) => ({
    type: ActionTypes.ADD_REAGENTS,
    payload: reagents
});

export const postReagents = (
    reagent_name,
    supplier,
    lot_number,
    cat_number,
    expiry_date,
    date_received,
    condition,
    storage_location,
    comment
) => (dispatch) => {

    const newReagents = {
        reagent_name : reagent_name,
        supplier: supplier,
        lot_number: lot_number,
        cat_number: cat_number,
        expiry_date: expiry_date,
        date_received: date_received,
        condition: condition,
        storage_location: storage_location,
        comment: comment,
        date_of_use: '',
        assay: ''
    }
    //newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newReagents),
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
        .then(response => dispatch(addReagents(response)))
        .catch(error => { console.log('Post reagents', error.message) 
            alert('Your comment could not be posted\nError: '+ error.message)})
        
}

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

export const reagentsFailed = (errmess) => ({
    type: ActionTypes.REAGENTS_FAILED,
    payload: errmess
});

export const renderReagents = (reagents) => ({
    type: ActionTypes.RENDER_REAGENTS,
    payload: reagents
});

export const fetchTests = () => (dispatch) => {
    return fetch(baseUrl + 'tests')
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
        .then(tests => dispatch(renderTests(tests)))
        .catch(error => dispatch(testsFailed(error.message)));
}

export const testsFailed = (errmess) => ({
    type: ActionTypes.TESTS_FAILED,
    payload: errmess
});

export const renderTests = (tests) => ({
    type: ActionTypes.RENDER_TESTS,
    payload: tests
});
