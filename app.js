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

app.get('/', function(req, res){
    recordModel.find({},function(err, logs){
        res.json(logs);
    })

});

app.listen(3000);