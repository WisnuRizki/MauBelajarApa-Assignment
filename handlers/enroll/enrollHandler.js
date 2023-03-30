const { Transaction ,Course,Enroll,sequelize} = require('../../models/index')
const {
    responseSuccess, 
    responseError, 
    responseBadRequest,
    responseServerError
} = require("../../helpers/responseHelper")

const getEnrollByUser = async (event,context) => {
    const userId = event.requestContext.authorizer.principalId;
    const data = await Enroll.findAll({
        where: {
            userId
        },
        attributes: {
            exclude: ['createdAt','updatedAt'],
        },
        include: [{
            model: Course,
            as: "courses",
            attributes: {
                exclude: ['createdAt','updatedAt'],
            },
        }]
    })

    if(!data){
        return responseError("Data not found")
    }

    return responseSuccess(data)
}

const deleteEnroll = async (event) => {
    const id = event.pathParameters.id
    const userId = event.requestContext.authorizer.principalId;

    const checkEnroll = await Enroll.findOne({
        where: {
            id,
            userId
        }
    })

    if(!checkEnroll){
        return responseError("Enroll not found")
    }

    const deleteEnroll = await Enroll.destroy({
        where: {
          id,
          userId
        }
    });

    if(!deleteEnroll){
        return responseServerError("Something went wrong")
    }
    
    return responseSuccess(null,"Success delete enroll")
}


module.exports = {
    getEnrollByUser,
    deleteEnroll
}
