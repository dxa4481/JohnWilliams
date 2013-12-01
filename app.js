
var initMongo = require('./initMongo')
var recordModel = require('./models/recordModel')
var express = require("express")
var http = require("https")
var api_routes = require("./routes/api_routes")
var ui_routes = require("./routes/ui_routes")
var gox_exchange = require("./exchanges/gox")
var coinbase_exchange = require("./exchanges/coinbase")

app = express()


app.getJSONFromUrl= function(url, cb){
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

db = initMongo.init()
app.listen(3000);
api_routes(app, recordModel);
ui_routes(app);
gox_exchange(recordModel);
coinbase_exchange(app, recordModel);


