const { Vendor } = require('../../models/index')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../helpers/jwt')
const {
    responseSuccess, 
    responseError, 
    responseBadRequest,
    responseServerError
} = require("../../helpers/responseHelper")

const RegisterVendor = async (event,context) => {
    const body = JSON.parse(event.body)
    const password = bcrypt.hashSync(body.password,10);
    
    const checkVendor = await Vendor.findOne({
        where: {
            email: body.email
        }
    })
    if(checkVendor){
        return responseError("Vendor already exists")
    }

    const registerVendor = await Vendor.create({
        name: body.name,
        noHp: body.noHp,
        email: body.email,
        password
    })

    if(!registerVendor){
        return responseServerError("Something went wrong")
    }

    return responseSuccess(registerVendor,"Vendor Created")
    
}

const LoginVendor = async (event,context) => {
    const body = JSON.parse(event.body)

    const checkVendor = await Vendor.findOne({
        where: {
            email: body.email
        }
    })
    if(!checkVendor){
        return responseError("Vendor not found")
    }

    const passwordValid = bcrypt.compareSync(body.password, checkVendor.password);
    if(!passwordValid) {    
        return responseBadRequest("Email or password not valid")
    }

    let data = {
        id: checkVendor.id,
        email: checkVendor.email,
    }
    let token = generateToken(data);

    return responseSuccess(token,"Login Success")
}

module.exports = {
    RegisterVendor,
    LoginVendor
}

