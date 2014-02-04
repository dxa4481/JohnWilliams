JohnWilliams
============

This is an open source RESTful bitcoin market API used for collecting real time price change data and analyzing it. This app also supports SMS notification short term average crosses long term average.

## Installation

    $ npm install
    
## Dependancies

    -mongoDB
    
## Quick Start

 Start the app:

    $ npm start
    
## RESTful examples
    
 Entire log:
 
    $ curl localhost:3000/coinbase
    
 Latest price:
    
    $ curl localhost:3000/coinbase/latest
      
 Short term average/Long term average current state:
    
    $ curl localhost:3000/coinbase/state
      
 Short term averages/Long term averages:
    
    $ curl localhost:3000/coinbase/averages/:long/:short
