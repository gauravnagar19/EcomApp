var express = require('express');
var router = express.Router();
var redis = require("redis");
var AzureSearch = require('azure-search');


// Add your cache name and access key.
var client = redis.createClient(6380, 'cacheISM6930.redis.cache.windows.net', { auth_pass: 'EH6e/d9G7VA5vmStzXmsh0Sq0ypDF3OBRBKukGVVhz0=', tls: { servername: 'cacheISM6930.redis.cache.windows.net' } });

router.get('/', function (req, res) {
    client.get('topproducts', function (err, string) {
        var obj = JSON.parse(string);
        //console.log(obj);
        var db = req.db;
        var collection = db.get('Products');
        collection.find({}, {}, function (e, docs) {
        //console.log(docs);
        res.render('index.jade', {
            title: 'Ecomm',
            topproductlist: obj,
            allproductlist: docs
            });
        });
    });
});

/* GET searchproductlist page. */
router.get('/searchproductlist', function (req, res) {

    var searchCrit = req.query['search'];

    var client = AzureSearch({
        url: "https://newecomsearch.search.windows.net",
        key: "B150FACEA86702AC793433F2AFE4E6AA"
    });

    

   if (req.query['search'] === null || req.query['search'] === undefined) {
       searchCrit = '*';
   }
   else {
       searchCrit = searchCrit + '*';
   }

   console.log(searchCrit);

    // search the index 
    client.search('productind', { search: searchCrit}, function (err, results, raw) {
        res.render('searchproductlist', {
            "searchproductlist": results
        });
    });
});

module.exports = router;