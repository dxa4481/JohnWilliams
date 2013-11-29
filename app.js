/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 11/27/13
 * Time: 10:28 PM
 * To change this template use File | Settings | File Templates.
 */

var gox = require('goxstream')
var initMongo = require('./initMongo')
var recordModel = require('./recordModel')
var express = require("express")
var http = require("https")

app = express()

db = initMongo.init()

var defaultOptions = {
    currencies: ['USD']
    , ticker: true
    , depth: false
    , trade: false
    , lag: false
}
gox.createStream(defaultOptions).on('data', function(data){
    try{
        console.log("GOX: The buy price of BTC in " + JSON.parse(data).ticker.buy['currency'] +
            " is " + JSON.parse(data).ticker.buy['value'] + " and the sell price is " +
            JSON.parse(data).ticker.sell['value']
        );
        var jsonData = JSON.parse(data)
        var record = new recordModel(
            {
                exchange : "GOX",
                buyPrice: jsonData.ticker.buy['value'],
                sellPrice : jsonData.ticker.sell['value'],
                recordTime: new Date(jsonData.ticker.now / 1000),
                high : jsonData.ticker.high['value'],
                avg : jsonData.ticker.avg['value'],
                low : jsonData.ticker.low['value']
            })
        record.save();
    }
    catch (err) {}
});

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

app.get('/',function(req,res){
    res.send("I changed it so you send a request like this GET /[time before]/between/[time after] where before and after are unix timestamps")
})

app.listen(3000);
var buyPrice, sellPrice
setInterval(function(){

    getBuySellFromUrl("https://coinbase.com/api/v1/prices/sell", function(bp_json){
        getBuySellFromUrl("https://coinbase.com/api/v1/prices/buy", function(sp_json){
            var newBuyPrice = Number(bp_json.subtotal.amount)
            var newSellPrice = Number(sp_json.subtotal.amount)
            if(newBuyPrice != buyPrice && newSellPrice != sellPrice){
                buyPrice = newBuyPrice
                sellPrice = newSellPrice
                var record = new recordModel(
                    {
                        exchange : "coinbase",
                        buyPrice: buyPrice,
                        sellPrice : sellPrice
                    })
                record.save()
            }
        })

    })

},3000);


var getBuySellFromUrl= function(url, cb){
    var total = ''
    try{
        http.get(url,function(res){
            res.on('data', function (chunk) {
                total += chunk
            });
            res.on('end',function(){
                total = total.toString()
                var data = JSON.parse(total)
                cb(data);
            })
        })
    }
    catch(err){console.log(err)}


}