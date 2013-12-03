
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



    app.get('/coinbase/averages/:long/:short', function(req, res){
        var long = Number(req.params.long)
        var short = Number(req.params.short)
        if(!(long && short)){return res.send(401)}
        recordModel.find({exchange: "coinbase", recordTime : {$gt: (Date.now() - long * 1000)}}, function(err, longlist){
            recordModel.find({exchange: "coinbase", recordTime : {$gt: (Date.now() - short * 1000)}}, function(err, shortlist){
                var longAvg = _avgListOfObj(longlist, "buyPrice")
                var shortAvg = _avgListOfObj(shortlist, "buyPrice")
                console.log(longlist)
                res.json({longBuyAvg: longAvg, shortBuyAvg: shortAvg, buyIndex: shortAvg/longAvg, shortSeconds: short, longSeconds: long})
            })
        })
    })
}

_avgListOfObj = function (list, attribute){
    var sum = 0
    for (var i = 0; i < list.length; i++) {
        sum += list[i][attribute]
    }
    var avg = sum / list.length
    return avg
}
module.exports = api_routes