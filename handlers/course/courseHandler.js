const { Transaction ,Course,Enroll,sequelize} = require('../../models/index')
const {
    responseSuccess, 
    responseError, 
    responseBadRequest,
    responseServerError
} = require("../../helpers/responseHelper")

const createCourse = async (event,context) => {
    const vendorId = event.requestContext.authorizer.principalId;
    const body = JSON.parse(event.body)

    const insertCourse = await Course.create({
        vendorId,
        name: body.name,
        price: body.price,
        description: body.description,
        isActive: body.isActive
    })

    if(!insertCourse){
        return responseServerError("Something went wrong")
    }

    return responseSuccess(insertCourse)
}

const deleteCourse = async (event) => {
    const id = event.pathParameters.id
    const vendorId = event.requestContext.authorizer.principalId;

    const checkCourse = await Course.findOne({
        where: {
            id,
            vendorId
        }
    })

    if(!checkCourse){
        return responseError("Course not found")
    }

    const deleteCourse = await Course.destroy({
        where: {
          id,
          vendorId
        }
    });

    if(!deleteCourse){
        return responseServerError("Something went wrong")
    }
    
    return responseSuccess(null,"Success delete Course")
}

const updateCourse = async (event) => {
    const id = event.pathParameters.id
    const vendorId = event.requestContext.authorizer.principalId;
    const body = JSON.parse(event.body)

    const checkCourse = await Course.findOne({
        where: {
            id,
            vendorId
        }
    })

    if(!checkCourse){
        return responseError("Course not found")
    }

    const updateCourse = await Course.update(body, {
        where: {
          id,
          vendorId
        }
    });

    if(!updateCourse){
        return responseServerError("Something went wrong")
    }

    return responseSuccess(null,"Success update course")
}

const getAllCourseByVendor = async (event) => {
    const vendorId = event.requestContext.authorizer.principalId;

    const allCourse = await Course.findAll({
        where: {
            vendorId
        }
    })

    if(!allCourse){
        return responseError("Course not found")
    }

    return responseSuccess(allCourse)
}

module.exports = {
    createCourse,
    deleteCourse,
    updateCourse,
    getAllCourseByVendor
}