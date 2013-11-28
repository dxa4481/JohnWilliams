/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 11/21/13
 * Time: 5:19 PM
 * To change this template use File | Settings | File Templates.
 */

https = require('https')



var getData = function(cb){
    try
    {
        https.get("https://btc-e.com/api/2/btc_usd/ticker",function(res){
            res.on('data', function (chunk) {
                    var resObj = JSON.parse(chunk.toString())
                    console.log("BTCE: The buy price of USD in BTC is " + resObj.ticker.buy
                        + " and the sell price is " + resObj.ticker.sell
                    );
                    cb(Number(resObj.ticker.buy), Number(resObj.ticker.sell))

            });
        })
    }
    catch(err)
    {console.log(err)}
}
module.exports = getData
