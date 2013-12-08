var mongoose = require("mongoose")
var crypto = require("crypto")



schema = new mongoose.Schema(
    {
        userName: String,
        passwordHash: String,
        email: String,
        fullName: String,
        admin: Boolean
    })


_hash_password = function(raw_passwd){
    shasum = crypto.createHash("sha1")
    shasum.update(raw_passwd)
    return shasum.digest("hex")
}