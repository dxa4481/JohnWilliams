
var ui_routes = function(app){
    app.get('/', function(req, res){
        res.send("<div>Added a new exchange, try</div> <div> GET /gox</div> <div> or </div> GET /coinbase")

    });
}
module.exports = ui_routes