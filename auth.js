// const { MasterApiKey } = require('./config.json');
const path = require("path")
  
module.exports = (req, res, next) => {
    const MasterApiKey = "a"
    const { ['api-key']: apiKey } = req.headers;
    const endpoint = req.path

    
    if (endpoint === "/") {
      res.redirect("https://github.com/Robin5605/jarvide-api/blob/master/README.md")
      return
    }


    if(apiKey === MasterApiKey) {
        next();
    } else if ( endpoint === "/get" ) {
        res.send({
            "ERROR": "Invalid authentication token or none provided at all.",
        });
    } else {
        res.send({
            "ERROR": "Invalid authentication token or none provided at all.",
        });
    }
}