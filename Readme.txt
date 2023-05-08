Instructions to run -> node path/to/server.js 
Above command will run the server by default on port 3000 which can be changed from confing/app.js


Description of Solution - 

Used NodeJS and express as a framework to builder the server/endpoints. The application is config driven, application check's for cluster enablement from a config value (disabled by default as using server to store the data which will cause inconsistency in data across different clusters). 

Bootstraping used to load/boot up initial part of the server such as defining global variable's, etc. 

Used a middleware to log all request's. 

Most of the assumptions are client based assumptions's, ignoring data validation done at a payload level, any and all key's are accepted while creating/updating order.

The logic is written at a service layer which call's base layer which can be used to log in-turn other metric's such as delay's, perform specific functions on service's and so on.


If this project was to be pushed to production - 
Handling of route's could have been done in a better way. 
The response handling can be done by a common utility which would build a proper structure by resolving all the data (error code) and sending that as a final response. 
Common file to handle message template's increasing resuability.


Finished all spec's, created basic test cases and executed them and ran successfully. 

Spent over 3 hours in building/testing basic functionalities of the endpoint. 

Ran into a data base issue handling at server level as I introduced cluster earlier, this caused me to disable cluster by default, how ever in production as a real DB would be implemented, that will take care of this.


