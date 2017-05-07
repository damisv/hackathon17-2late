var express = require('express');
var router = express.Router();
var db = require('../data/db');

router.post('/login', function(req, res, next) {
    db.userExists(req.body.user)
        .then(function(result){
            delete result.password;
            res.send({user:result});
        });
});

module.exports = router;
