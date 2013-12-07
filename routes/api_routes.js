var coinbase_sms = require("../notifications/coinbase_sms")

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
    app.get('/coinbase/latest', function(req, res){
        recordModel.findOne({}, {}, { sort: { recordTime : -1 } }, function(err, log) {
            res.json(log)
        });
    })

    app.get('/coinbase/state', function(req, res){
        state:coinbase_sms.state(function(state){
            res.json({state:state})
        })

    })

    app.get('/coinbase/averages/:long/:short', function(req, res){
        var long = Number(req.params.long)
        var short = Number(req.params.short)
        if(!(long && short)){return res.send(401)}
        recordModel.getAverage("coinbase", long, "buyPrice", function(longAvg){
            recordModel.getAverage("coinbase", short, "buyPrice", function(shortAvg){
                res.json({longBuyAvg: longAvg, shortBuyAvg: shortAvg, buyIndex: shortAvg/longAvg, shortSeconds: short, longSeconds: long})
            })
        })
    })
}




module.exports = api_routes