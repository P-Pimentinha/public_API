// this function will prevent the server from crashing in case of an unhandled promise rejection.
module.exports = function(err, req, res, next){
    res.status(500).send("Something Failed");
}