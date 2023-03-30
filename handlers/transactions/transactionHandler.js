const { Transaction ,Course,Enroll,sequelize} = require('../../models/index')
const {
    responseSuccess, 
    responseError, 
    responseBadRequest,
    responseServerError
} = require("../../helpers/responseHelper")

const createTransactions = async (event,context) => {
    const userId = event.requestContext.authorizer.principalId;
    const body = JSON.parse(event.body)

    const checkCourse = await Course.findOne({
        where : {
            id : body.courseId,
            vendorId: body.vendorId
        }
    })

    if(!checkCourse){
        return responseError("Course Not found")
    }
   
    if(checkCourse.isActive === false){
        return responseError("Course is not active")
    }
  
    if(body.amount < checkCourse.price){
        return responseBadRequest("Amount is not enough")
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            const insertTrans = await Transaction.create({
                userId,
                courseId: body.courseId,
                vendorId: body.vendorId,
                totalPayment: body.amount
            })

            const insertEnroll = await Enroll.create({
                userId,
                courseId: body.courseId,
            })
        });
    } catch (error) {
        return responseServerError("Something went wrong")
    }
   
    return responseSuccess(null,"Success Enroll Course")
}

module.exports = {
    createTransactions
}