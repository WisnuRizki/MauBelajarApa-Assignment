const responseSuccess = (data,message) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'Success',
            message: message || 'Success',
            data,
        }),
    };
}

const responseError = (message) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'Success',
            message: message || 'Success With warning',
        }),
    };
}

const responseServerError = (message) => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            status: 'Failed',
            message: message || 'Server error',
        }),
    };
}

const responseBadRequest = (message) => {
    return {
        statusCode: 400,
        body: JSON.stringify({
            status: 'Failed',
            message: message || 'Success With warning',
        }),
    };
}

module.exports = {
    responseSuccess,
    responseError,
    responseBadRequest,
    responseServerError
}