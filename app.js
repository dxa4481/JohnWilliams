
var initMongo = require('./nitMongo')
var recordModel = require('./models/recordModel')
var express = require("express")
var http = require("https")
var api_routes = require("./routes/api_routes")
var ui_routes = require("./routes/ui_routes")
var gox_exchange = require("./exchanges/gox")
var coinbase_exchange = require("./exchanges/coinbase")
var config = require("./config")
var coinbase_sms = require("./notifications/coinbase_sms")

app = express()


app.getJSONFromUrl= function(url, cb){
    var total = ''
    http.get(url,function(res){
        res.on('data', function (chunk) {
            total += chunk
        });
        res.on('end',function(){
            total = total.toString()

            try{
                var data = JSON.parse(total)
            }
            catch(err){
                console.log(err)
                return cb(null, Error("Not json"))
            }
            cb(data, null);
        })
    })

}

db = initMongo.init()
app.listen(3000);
api_routes(app, recordModel);
ui_routes(app);
gox_exchange(recordModel);
coinbase_exchange(app, recordModel);
coinbase_sms.start();


