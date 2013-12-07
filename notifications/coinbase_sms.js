var recordModel = require("../models/recordModel")
var nodemailer = require("nodemailer")

var mailOptions = {
    from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
    to: "dxa4481@rit.edu, 7322369326@vtext.com, 8454300396@messaging.sprintpcs.com", // list of receivers
    subject: "Hello", // Subject line
    html: "<b>Hello world ✔</b>" // html body
}
var user = "SMSbitcoinserver@gmail.com"
var pass = "fryingseagullcookies"
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: user,
        pass: pass
    }
});

var state = "stable"

var getState = function(cb){
    recordModel.getAverage("coinbase", 36000, "buyPrice", function(longAvg){
        recordModel.getAverage("coinbase", 3600, "buyPrice", function(shortAvg){
            if(shortAvg > longAvg * 1.1){
                cb("gainedTen")
            }else if(shortAvg < longAvg * .9){
                cb("lostTen")
            }else if(shortAvg < longAvg * 1.05 && shortAvg > longAvg * .95){
                cb("stable")
            }
            else{
                cb(state)
            }
        })
    })
}


getState(function(newState){
    state = newState
})



module.exports = {
    start : function(){
        setInterval(function(){
            getState(function(newState){
                if(newState != state){
                    mailOptions.text = ''
                    if(newState == "gainedTen"){
                        mailOptions.text = "In the last hour the market has grown rapidly in value, you'll get another text when it levels off"
                    }else if(newState == "lostTen"){
                        mailOptions.text = "In the last hour the market has taken a big hit, you'll get another text when it levels off"
                    }else{
                        if(state == "gainedTen"){
                            mailOptions.text = "The market is stabilizing, I would SELL now."
                        }else if(state == "lostTen"){
                            mailOptions.text = "The market is stabilizing, I would BUY now."
                        }
                    }
                    if(mailOptions.text != ''){
                        smtpTransport.sendMail(mailOptions, function(error, response){
                            if(error){
                                console.log(error);
                            }else{
                                console.log("Message sent: " + response.message);
                            }

                            // if you don't want to use this transport object anymore, uncomment following line
                            //smtpTransport.close(); // shut down the connection pool, no more messages
                        });
                    }
                }
                state = newState
                console.log(state)
            })

        }, 10000)
    },
    state : getState
}