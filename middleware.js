
function initMiddleware(app){

    //Request logger
    if(enableRequestLogging){
        app.use("*" , (req, res , next) => {
            console.log("Logging entry at ", new Date());
            console.log("METHOD --->" , req.method);
            console.log("HOSTNAME --->", req.hostname);
            console.log("ENDPOINT --->" , req._parsedUrl.path);
            console.log("--------x---------x--------")
            next()
        })    
    }
    

}

module.exports = initMiddleware;