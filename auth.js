// const { MasterApiKey } = require('./config.json');

module.exports = (req, res, next) => {
    const MasterApiKey = "a"
    const { ['api-key']: apiKey } = req.headers;
    const endpoint = res['_parsedUrl']['_raw']
    
    
    if (endpoint === "/") {

    }
    if(apiKey === MasterApiKey) {
        next();
    } else {
        res.send({
            "ERROR": "Invalid authentication token or none provided at all.",
        });
    }
}