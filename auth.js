// const { MasterApiKey } = require('./config.json');

module.exports = (req, res, next) => {
    const { ['api-key']: apiKey } = req.headers;
    if(apiKey === MasterApiKey) {
        next();
    } else {
        res.send({
            "ERROR": "Invalid authentication token or none provided at all."
        });
    }
}