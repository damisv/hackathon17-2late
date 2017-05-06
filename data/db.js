var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/hackathon-2late';
var ObjectID = require('mongodb').ObjectID;

var db;
MongoClient.connect(url, function(err, getdb) {
    if(!err){
        db = getdb;
    }else{
        console.log("\033[31mMongoDB is closed\x1b[0m");
    }
    db.createCollection( "complaints");
    db.createCollection( "categories");

});

module.exports = {
    findAllComplaints:function (success,fail) {
        db.collection("complaints").find().toArray(function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    },
    findAllCategories:function (success,fail) {
        db.collection("categories").find().toArray(function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    },
    addCategory:function(category,success,fail) {
        db.collection("categories").insertOne({name: category}, function (err, result) {
            if (!err) {
                success(result);
            }else{
                fail();
            }
        });
    },
    removeCategory:function(category,success,fail){
        db.collection("categories").deleteOne({_id:ObjectID(category._id)},function(err,result){
            if(result.deletedCount>0){
                success();
            }else{
                fail();
            }
        })
    },
    removeComplaint:function(complaint,success,fail){
        db.collection("complaints").deleteOne({_id:ObjectID(complaint._id)},function(err,result){
            if(result.deletedCount>0){
                success();
            }else{
                fail();
            }
        })
    },
    removeComplaintsOfCategory:function(category,success,fail){
        db.collection("complaints").deleteMany({category:category},function(err,result){
            if(result.deletedCount>0){
                success();
            }else{
                fail();
            }
        })
    },
    removeAllComplaints:function(success,fail){
        db.collection("complaints").deleteMany({},function(err,result){
            if(!err){
                success();
            }else{
                fail();
            }
        })
    },
    findDistinctCategoriesFromComplaints:function(success,fail){
        db.collection("complaints").distinct("category",function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        })
    }
};

