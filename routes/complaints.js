var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET home page. */
router.get('/all', function(req, res) {
    db.findAllComplaints()
        .then(function(result){
            res.send({complaints:result});
        });
});

router.get('/one/:id', function(req, res) {
    console.log(req.params.id);
    db.findComplaintById(req.params.id)
        .then(function(result){
            console.log(result);
            res.send({complaint:result});
        });
});

router.post('/add', function(req, res) {
    delete req.body.complain._id;
    db.addComplain(req.body.complain)
        .then(function (result) {
            db.createReportedComplaint(result)
            res.send({complain:req.body.complain});
        });
});

router.post('/reportComplaint', function(req) {
    db.increaseReportedComplaint(result)
        .then(function(result){
            res.send();
        });

});

module.exports = router;