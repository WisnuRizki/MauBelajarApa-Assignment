const health = async (event,context) => {
    const userId = event.requestContext.authorizer.principalId;
    return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'User created',
          userId
        }),
    };
}

module.exports = {
  health
}
