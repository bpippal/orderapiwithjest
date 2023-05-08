const bodyparser = require("body-parser");
const appConfig = require("./config/app");

//Load the service's
const databaseservice = require("./Service/databaseservice");

function loadRoutes(app){

    //Attach all parser's on app such as json-parser, etc.
    app.use(bodyparser.json());


    //Load middleware's
    const initMiddleware = require("./middleware");
    initMiddleware(app);


    //Route's can be loaded a better way ? TODO

    app.get("/orderall" , (req, res) => {
        const dataBaseServiceInst = new databaseservice();
        let orders = dataBaseServiceInst.getAllOrders();

        return res.json(orders);
    })

    app.get("/order/:id" , (req, res) => {
        const dataBaseServiceInst = new databaseservice();
        let order = dataBaseServiceInst.getOrderById(req.params.id);
        if(order){
            return res.json(order);
        }else{
            return res.status(404).json({err : "Data Not Found"});
        } 
    })

    //Create's data
    app.post("/order" , (req, res) => {

        let payload = req.body;
        const dataBaseServiceInst = new databaseservice();
        let createdResult = dataBaseServiceInst.addOrder(payload);

        let orderConfig = require("./config/order");

        if(createdResult.canCreate){
           return res.json({MESSAGE : "Successfully added order"})
        }else{
            return res.status(400).json({MESSAGE : `Could not add data as validation failed, Please try again after ${orderConfig.minTime} hour`})
        }
    })

    //Update Order byId
    app.put("/order/:id" , (req, res) => {

        const dataBaseServiceInst = new databaseservice();
        let updateResult = dataBaseServiceInst.updateOrderById(req.params.id , req.body);
        let orderConfig = require("./config/order");


        if(updateResult.IdNotFound){
            return res.status(400).json({err : "Data Not found"});
        }

        if(!updateResult.canCreate){
            return res.status(400).json({MESSAGE : `Could not add data as validation failed, Please try again after ${orderConfig.minTime} hour`})
        }

        return res.json({Message : "Updated order successfully!"});

    })

    app.delete("/order/:id" , (req, res) => {
        const dataBaseServiceInst = new databaseservice();

        let deleteResult = dataBaseServiceInst.deleteOrderById(req.params.id);

        if(deleteResult.IdNotFound){
            return res.status(400).json({err : "Data Not found"});
        }

        return res.json({MESSAGE : "Deleted order successfully!"});

    })

    //Default route handling for all other endpoints
    app.use("*" , (req, res) => {
        res.status(404).json({err : "Route not Found"});
    })

    app.listen(appConfig.port, () => {
        console.log("**************************Finished Server Boot Up Process********************");
        console.log(`**************************SERVER RUNNING ON PORT ${appConfig.port}********************`);
        console.log("\n");
    })

}

module.exports = loadRoutes;