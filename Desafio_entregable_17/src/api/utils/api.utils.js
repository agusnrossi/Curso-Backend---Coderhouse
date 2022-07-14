const apiSuccessResponse = (data,statusCode =200) => {
    return{
        errror: false,
        data,
        statusCode,
    }
}


const apiFailedResponse = (error,statusCode =400) => {
    return{
        errror: true,
        error_details: error,
        statusCode,
    }
}


module.exports = {
    apiSuccessResponse,
    apiFailedResponse,
}
