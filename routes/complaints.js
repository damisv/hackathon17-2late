var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET home page. */
router.get('/all', function(req, res, next) {
    db.findAllComplaints(success,fail);
    function success(result){
        console.log(result);
        res.send({complaints:result});
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/add', function(req, res, next) {
    db.addComplain(req.body.complain,success,fail);
    function success(){
        res.send({complain:req.body.complain});
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/report', function(req, res, next) {
    db.reportCompalint(req.body.complaint,success,fail);
    function success(){
        res.send({complain:req.body.complain});
    }
    function fail(){
        res.status(200).send();
    }
});

module.exports = router;