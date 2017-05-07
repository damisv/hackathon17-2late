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

router.post('/add', function(req, res) {
    db.addComplain(req.body.complain)
        .then(function (result) {
            res.send({complain:req.body.complain});
        });
});

router.post('/report', function(req, res) {
    db.reportComplaint(req.body.complaint)
        .then(
            //res.send({complain:req.body.complain});
        );
});

module.exports = router;