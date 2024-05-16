const middleware = (req, res, next) => {
    const { method, url } = req
    console.log(`Request Method: ${method} - Request Url: ${url}`)
    next()
}

module.exports = middleware;