var express = require('express');
var router = express.Router();
var db = require('../data/db');

router.post('/login', function(req, res, next) {
    db.userExists(req.body.user,success,fail);
    function success(user){
        delete user.password;
        res.send({user:user});
    }
    function fail(){
        res.status(200).send();
    }
});

module.exports = router;
