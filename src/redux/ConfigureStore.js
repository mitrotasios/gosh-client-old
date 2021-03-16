import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import { Reagents } from "./reagents";
import { Tests } from "./tests";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialReagentInfo, InitialAccountInfo, InitialEditReagent } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            reagents: Reagents,
            tests: Tests,
            ...createForms({
                addReagent: InitialReagentInfo,
                editReagent: InitialEditReagent,
                accountInfo: InitialAccountInfo
            })
        }),
        // supply as args, once we do it they become available within the app
        applyMiddleware(thunk, logger)
    );

    return store;
}