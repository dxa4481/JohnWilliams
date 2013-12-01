var gox = require('goxstream')
var gox_exchange = function(recordModel){
    var defaultOptions = {
        currencies: ['USD']
        , ticker: true
        , depth: false
        , trade: false
        , lag: false
    }
    try{
        var stream = gox.createStream(defaultOptions)
        stream.on('data', function(data){
//            var jsonData = JSON.parse(data)
//            var record = new recordModel(
//                {
//                    exchange : "GOX",
//                    buyPrice: jsonData.ticker.buy['value'],
//                    sellPrice : jsonData.ticker.sell['value'],
//                    recordTime: new Date(jsonData.ticker.now / 1000),
//                    high : jsonData.ticker.high['value'],
//                    avg : jsonData.ticker.avg['value'],
//                    low : jsonData.ticker.low['value']
//                })
//            record.save();

        });
        stream.on('error',function(e){
            console.log("Error: " + hostNames[i] + "\n" + e.message);
            console.log( e.stack );
        });
    }
    catch (err) {gox_exchange(recordModel)}
}

module.exports = gox_exchange