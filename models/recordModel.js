mongoose = require("mongoose")

schema = new mongoose.Schema(
    {
        recordTime:
            {
                index: true,
                "default": Date.now,
                type: Date
            },
        exchange: String,
        buyPrice: Number,
        sellPrice: Number,
        high: Number,
        avg: Number,
        low: Number
    })



schema.statics ={
    getAverage : function(exchange, seconds, attribute, cb){

        record.find({exchange: exchange, recordTime : {$gt: (Date.now() - seconds * 1000)}}, function(err, recordList){
            var avg = _avgListOfObj(recordList, attribute)
            cb(avg)

        })
    }

}




_avgListOfObj = function (list, attribute){
    var sum = 0
    for (var i = 0; i < list.length; i++) {
        sum += list[i][attribute]
    }
    var avg = sum / list.length
    return avg
}
record = mongoose.model("record", schema)

module.exports = record