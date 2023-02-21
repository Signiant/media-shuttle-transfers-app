import 'whatwg-fetch';
import HttpStatus from 'http-status-codes';

/* eslint-disable no-undef */

const getResponseJson = async (response) => {
    try {
        return await response.json();
    } catch (err) {
        return null;
    }
};

const getResponseError = (response, responseBody) => {
    const error = new Error(responseBody.message);
    error.status = response.status;
    return error;
};

export default async function (url, options) {
    const response = await fetch(url, options);
    const responseBody = await getResponseJson(response);

    if (response.status === HttpStatus.OK) {
        return responseBody;
    } else {
        throw getResponseError(response, responseBody);
    }
}