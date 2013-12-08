
var ui_routes = function(app){
    app.get('/', function(req, res){
        res.render("login")

    });
    app.post('/', function(req, res){
        console.log(req.body)
        res.send("got here")
    })
}
module.exports = ui_routes