/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 11/30/13
 * Time: 11:39 PM
 * To change this template use File | Settings | File Templates.
 */

var coinbase_exchange = function(app, recordModel){
    var buyPrice, sellPrice

    try{
        setInterval(function(){

            app.getJSONFromUrl("https://coinbase.com/api/v1/prices/sell", function(bp_json, err){
                if(err != null){
                    app.getJSONFromUrl("https://coinbase.com/api/v1/prices/buy", function(sp_json, err){
                        if(err != null){
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
                                console.log(buyPrice)
                            }
                        }
                    })
                }


            })

        },30000);
    }
    catch(err){
        coinbase_exchange(app, recordModel)
    }
}

module.exports = coinbase_exchange