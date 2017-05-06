var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET home page. */
router.get('/complaints', function(req, res, next) {
    db.findAllComplaints(success,fail);
    function success(result){
        res.send({complaints:result});
    }
    function fail(){
        res.status(200).send();
    }
});

router.get('/categories', function(req, res, next) {
    db.findAllCategories(success,fail);
    function success(result){
        res.send({categories:result});
    }
    function fail(){
        res.status(200).send();
    }
});

router.get('/getDistinctCategories', function(req, res, next) {
    db.findDistinctCategoriesFromComplaints(success,fail);
    function success(result){
        res.send({categories:result});
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/addCategory', function(req, res, next) {
    console.log("1");
    db.addCategory(req.body.categoryName,success,fail);
    function success(result){
        res.send({categoryName:result.ops[0].name});
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/removeComplaint', function(req, res, next) {
    db.removeComplaint(req.body.complaint,success,fail);
    function success(){
        res.send(req.body.complaint);
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/removeCategory', function(req, res, next) {
    db.removeCategory(req.body.category,success,fail);
    function success(){
        res.send(req.body.category);
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/removeComplaintOfCategory', function(req, res, next) {
    db.removeComplaintsOfCategory(req.body.category,success,fail);
    function success(){
        res.send({category:req.body.category});
    }
    function fail(){
        res.status(200).send();
    }
});

router.post('/removeAllComplaints', function(req, res, next) {
    db.removeAllComplaints(success,fail);
    function success(){
        res.send({ok:"ok"});
    }
    function fail(){
        res.status(200).send();
    }
});

module.exports = router;
