import {getPortals, getActiveTransfers} from './mediaShuttleManagmentApi';

export const LIST_PORTALS = 'LIST_PORTALS';
export const LIST_TRANSFERS = 'LIST_TRANSFERS';
export const LIST_PORTALS_SUCCESS = 'LIST_PORTALS_SUCCESS';
export const LIST_TRANSFERS_SUCCESS = 'LIST_TRANSFERS_SUCCESS';
export const SHOW_ERROR = 'SHOW_ERROR';

function listPortals () {
    return {
        type: LIST_PORTALS
    };
}

function listTransfers () {
    return {
        type: LIST_TRANSFERS
    };
}

function listPortalsSuccess (portals) {
    return {
        type: LIST_PORTALS_SUCCESS,
        portals
    };
}

function showError (error) {
    return {
        type: SHOW_ERROR,
        error
    };
}

function listTransferSuccess (transfers) {
    return {
        type: LIST_TRANSFERS_SUCCESS,
        transfers
    };
}

function loadPortals () {
    return async function (dispatch) {
        dispatch(listPortals());

        try {
            const portals = await getPortals();
            dispatch(listPortalsSuccess(portals.items));
        } catch (err) {
            dispatch(showError(err));
        }
    };
}

function loadTransfers () {
    return async function (dispatch) {
        dispatch(listTransfers());

        try {
            const transfers = await getActiveTransfers();
            dispatch(listTransferSuccess(transfers.items));
        } catch (err) {
            dispatch(showError(err));
        }
    };
}

export {
    loadPortals,
    loadTransfers
};