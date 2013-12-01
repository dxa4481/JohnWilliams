
var api_routes = function(app, recordModel){
    app.get('/gox', function(req, res){
        try{
            recordModel.find({exchange: "GOX"},function(err, logs){
                res.json(logs);
            })
        }
        catch(err){res.send(503)}

    });
    app.get('/coinbase', function(req, res){
        try{
            recordModel.find({exchange: "coinbase"},function(err, logs){
                res.json(logs);
            })
        }
        catch(err){res.send(503)}

    });
}

module.exports = api_routes