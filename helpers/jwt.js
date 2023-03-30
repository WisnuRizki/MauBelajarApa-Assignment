const { User , Vendor } = require("../models/index")

const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATEKEY


module.exports.validateUser = async (event, context) => {
  const authorizerToken = event.authorizationToken
  const authorizerArr = authorizerToken.split(' ')
  const token = authorizerArr[1]

  if (authorizerArr.length !== 2 ||
  authorizerArr[0] !== 'Bearer' ||
  authorizerArr[1].length === 0) {
    return generatePolicy('undefined', 'Deny', event.methodArn)
  }

  let decodedJwt = jwt.verify(token, privateKey)
  console.log(decodedJwt)

  if (typeof decodedJwt.id === 'undefined') {
    return generatePolicy('undefined', 'Deny', event.methodArn)
  }

  const checkUser = await User.findOne({where: {id: decodedJwt.id}})
  if(checkUser){
    return generatePolicy(decodedJwt.id, 'Allow', event.methodArn)
  }

  generatePolicy('undefined', 'Deny', event.methodArn)

}

module.exports.validateVendor = async (event, context) => {
  const authorizerToken = event.authorizationToken
  const authorizerArr = authorizerToken.split(' ')
  const token = authorizerArr[1]

  if (authorizerArr.length !== 2 ||
  authorizerArr[0] !== 'Bearer' ||
  authorizerArr[1].length === 0) {
    return generatePolicy('undefined', 'Deny', event.methodArn)
  }

  let decodedJwt = jwt.verify(token, privateKey)

  if (typeof decodedJwt.id === 'undefined') {
    return generatePolicy('undefined', 'Deny', event.methodArn)
  }
  console.log(decodedJwt)
  const checkVendor = await Vendor.findOne({where: {id: decodedJwt.id}})
  if(checkVendor){
    return generatePolicy(decodedJwt.id, 'Allow', event.methodArn)
  }

  generatePolicy('undefined', 'Deny', event.methodArn)

}

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource) {
  let authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    let policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    let statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  return authResponse
}

module.exports.generateToken = (payload) => {
  const token = jwt.sign(payload, privateKey, { 
      algorithm: 'HS256',
      expiresIn: "6H"
   });
   return token
}