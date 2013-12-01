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

record = mongoose.model("record", schema)

module.exports = record