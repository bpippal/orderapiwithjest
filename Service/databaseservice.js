const baseservice = require("./baseservice")
const _ = require("lodash");
const orderConfig = require("../config/order");
const utils = require("./utils");

let globalorderData = [
    {
        "id": "223",
        "createdAt": "2022-11-01T11:11:11.111Z",
        "totalfee": 100,
        "services": [
            {
            "id": "123",
            }
        ]
    },
    {
        "id": "224",
    "createdAt": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "789",
        }
    ]
    },
    {
        "id": "225",
        "createdAt": "2022-11-01T11:11:11.111Z",
        "totalfee": 100,
        "services": [
            {
            "id": "456",
            }
        ]
    },
];

let globalserviceData = [
    {
        "id" : 123,
        "name" : "Inspection"
    },
    {
        "id" : 789,
        "name" : "Testing"
    },
    {
        "id" : 456,
        "name" : "Analysis"
    }
];

function databaseservice(){
    this.serviceName = "databaseservice";
    this.orders = globalorderData;
    this.serviceData = globalserviceData;
    baseservice.call(this);
}

databaseservice.prototype.getOrderById = function(id){
    return _.find(this.orders , {"id" : id});
}

databaseservice.prototype.canCreateOrUpdate = function(lastOrderCreatedAt){

    let timeInSeconds = orderConfig.minTime * 3600 ; 

    if(new Date().getTime() - new Date(lastOrderCreatedAt).getTime()  > (timeInSeconds * 1000)){
        return true;
    }

    return false;
}

databaseservice.prototype.getAllOrders = function(){
    return this.orders;
}

databaseservice.prototype.addOrder = function(payload){

    let uniqueId = utils.generateId();

    //Will fail definetly over 999 data
    if(_.find(this.orders , {"id" : uniqueId})){
        uniqueId = utils.generateId();
    }

    let lastOrder = this.orders[this.orders.length - 1];

    let canCreate = this.canCreateOrUpdate(lastOrder.createdAt);

    let result = {};
    result.canCreate = canCreate;

    payload.id = uniqueId;
    payload.createdAt = new Date().toString();

    if(canCreate){
        globalorderData.push(payload)
    }

    return result;

}

databaseservice.prototype.updateOrderById = function(id , payload){

    let result = {};

    let orderToUpdate = this.getOrderById(id);

    if(!orderToUpdate){
        result.IdNotFound = true;
        return result;
    }

    if(!this.canCreateOrUpdate(orderToUpdate.createdAt)){
        result.canCreate = false;
    }

    result.IdNotFound = false;
    result.canCreate = true;


    let searchedIdx = _.findIndex(globalorderData , {id : id});
    payload.createdAt = orderToUpdate.createdAt;

    globalorderData[searchedIdx] = payload

    return result;

}

databaseservice.prototype.deleteOrderById = function(id){

    let result = {};

    if(!this.getOrderById(id)){
        result.IdNotFound = true;
        return result;
    }

    result.IdNotFound = false;
    let searchedIdx = _.findIndex(globalorderData , {id : id});

    globalorderData.splice(searchedIdx , 1);

    return result;

}

module.exports = databaseservice;