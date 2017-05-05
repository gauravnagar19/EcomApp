var express = require('express');
var router = express.Router();
console.log('Here');
//
/* GET home page. */
router.get('/', function (req, res) {
    res.render('search productlist', { title: 'Search Product List' });
    console.log('Here');
});