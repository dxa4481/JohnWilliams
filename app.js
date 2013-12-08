
var initMongo = require('./initMongo')
var recordModel = require('./models/recordModel')
var express = require("express")
var http = require("https")
var api_routes = require("./routes/api_routes")
var ui_routes = require("./routes/ui_routes")
var gox_exchange = require("./exchanges/gox")
var coinbase_exchange = require("./exchanges/coinbase")
var config = require("./config")
var coinbase_sms = require("./notifications/coinbase_sms")
var path = require('path');

var app = express()
var basedir = process.cwd()

app.configure(function(){
    app.set("views", path.join(basedir, "public/views") )
    app.set("view engine", "jade")
    app.use(express.logger())
    app.use(express.cookieParser())
    app.use(express.bodyParser())
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.getJSONFromUrl= function(url, cb){
    var total = ''
    var req = http.get(url,function(res){
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
    req.on('error', function(e) {
        cb(null, Error("Problem with getting URL"))
    });
    req.end();

}

db = initMongo.init()
app.listen(3000);
api_routes(app, recordModel);
ui_routes(app);
gox_exchange(recordModel);
coinbase_exchange(app, recordModel);
coinbase_sms.start();


