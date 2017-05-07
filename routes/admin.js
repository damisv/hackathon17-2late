var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET home page. */
router.get('/complaints', function(req, res) {
    db.findAllComplaints()
        .then(function(result){
            res.send({complaints:result});
        });
});

router.get('/categories', function(req, res) {
    db.findAllCategories()
        .then(function(result){
            res.send({categories:result});
        });
});

router.get('/getDistinctCategories', function(req, res) {
    db.findDistinctCategoriesFromComplaints()
        .then(function(result){
            res.send({categories:result});
        });
});

router.post('/addCategory', function(req) {
    db.addCategory(req.body.categoryName)
        .then(function (result) {
            console.log(result.ops[0].name);
        });
});

/*router.post('/addCategory', function(req, res, next) {
    console.log("1");
    db.addCategory(req.body.categoryName,success,fail);
    function success(result){
        res.send({categoryName:result.ops[0].name});
    }
    function fail(){
        res.status(200).send();
    }
});*/

router.post('/removeComplaint', function(req, res) {
    db.removeComplaint(req.body.complaint)
        .then(function(result){
            if(result.deletedCount>0){
                res.send(req.body.complaint);
            }
        });
});

router.post('/removeCategory', function(req, res) {
    db.removeCategory(req.body.category)
        .then(function(result){
                if(result.deletedCount>0){
                    res.send(req.body.category);
                }
            }
        );
});

router.post('/removeComplaintOfCategory', function(req, res) {
    db.removeComplaintsOfCategory(req.body.category)
        .then(function(result) {
                if (result.deletedCount > 0) {
                    res.send({category:req.body.category});
                }
            }
        );
});

router.post('/removeAllComplaints', function(req, res) {
    db.removeAllComplaints()
        .then(function(result){
            res.send({ok:"ok"});
        });
});

router.post('/createAccountType', function(req, res) {
    db.createAccountType(req.body.typeName)
        .then(function(result){
            res.send({account_type:result});
        });
});

router.post('/modifyAccountType', function(req, res) {
    db.modifyAccountType(req.body.account_type)
        .then(function(result){
            res.send({account_type:req.body.account_type});
            }
        );
});

router.post('/reportComplaint', function(req) {
    db.findReportedComplaint(req.body.complaint)
        .then(function(result){
            result.reports++;
            db.modifyReportedComplaint(result);
            //db.createReportedComplaint(req.body.complaint);
        });
});

router.get('/accountTypes', function(req, res) {
    db.findAllAccountTypes()
        .then(function(err,result){
            res.send({account_types:result});
    });
});

router.post('/createUser', function(req) {
    db.createUser(req.body.user).then(function (result) {
        console.log(result);
    });
});

module.exports = router;
