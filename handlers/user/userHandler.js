const { User } = require('../../models/index')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../helpers/jwt')
const {
    responseSuccess, 
    responseError, 
    responseBadRequest,
    responseServerError
} = require("../../helpers/responseHelper")

const Register = async (event,context) => {
    const body = JSON.parse(event.body)
    const password = bcrypt.hashSync(body.password,10);
    // Check if user already exists
    const checkUser = await User.findOne({
        where: {
            email: body.email
        }
    })

    if(checkUser){
        return responseError("User already exists")
    }

    const registerUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password
    })

    if(!registerUser){
        return responseServerError("Something went wrong")  
    }

    return responseSuccess(registerUser,"User Created")
}

const Login = async (event,context) => {
    const body = JSON.parse(event.body)

    const checkUser = await User.findOne({
        where: {
            email: body.email
        }
    })

    if(!checkUser){
        return responseError("Vendor not found")
    }

    const passwordValid = bcrypt.compareSync(body.password, checkUser.password);
    if(!passwordValid) {    
        return responseBadRequest("Email or password not valid")
    }

    let data = {
        id: checkUser.id,
        username: checkUser.username,
    }
    let token = generateToken(data);

    return responseSuccess(token,"Login Success")
}

module.exports = {
    Register,
    Login
}

