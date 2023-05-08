module.exports = {
    port : 3000,
    cluster : {
        //Default set false as using server as database, enabling cluster will cause mismatch of data in each cluster
        enable : false
    }
}