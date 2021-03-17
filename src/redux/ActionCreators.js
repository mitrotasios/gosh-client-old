import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';
import { TestTypes } from './testTypes';

export const removeReagents = (reagent) => ({    
    type: ActionTypes.REMOVE_REAGENTS,
    payload: reagent
});

export const deleteReagents = (
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
        .then(response => {dispatch(removeReagents(reagent_id))})
        .catch(error => { console.log('Delete reagents', error.message) 
            alert('Reagent could not be deleted\nError: '+ error.message)})
        
}

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
    //action,
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
        //action: action,
        comment: comment,
        date_of_use: "2010-01-01T23:56:02Z",
        last_used: "",
        assay: ''
    }
    //newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'reagents', {
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
            alert('Reagent could not be posted\nError: '+ error.message)})
        
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


export const deleteTests = (
    test_id
) => (dispatch) => {
    
    return fetch(baseUrl + 'tests/' + test_id, {
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
        .then(response => {dispatch(removeTests(test_id))})
        .catch(error => { console.log('Delete reagents', error.message) 
            alert('Reagent could not be deleted\nError: '+ error.message)})
        
}

export const removeTests = (test) => ({    
    type: ActionTypes.REMOVE_TESTS,
    payload: test
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

export const switchTests = (tests) => ({
    type: ActionTypes.SWITCH_TESTS,
    payload: tests
}) 

export const fetchTestTypes = () => (dispatch) => {
    return fetch(baseUrl + 'testTypes')
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
        .then(testTypes => dispatch(renderTestTypes(testTypes)))
        .catch(error => dispatch(reagentsFailed(error.message)));
}

export const testTypesFailed = (errmess) => ({
    type: ActionTypes.TESTTYPES_FAILED,
    payload: errmess
});

export const renderTestTypes = (testTypes) => ({
    type: ActionTypes.RENDER_TESTTYPES,
    payload: testTypes
});