console.log("*********************STARTING SERVER******************");
console.log("*********************BOOT UP STARTED******************");
console.log("\n\n");


//Basic thing's can be loaded at bootup such as defining global variable's, check to see if needs run in cluster mode,different methods to log

Object.defineProperty(global , "enableRequestLogging" , {
    writable : true,
    value : true
});