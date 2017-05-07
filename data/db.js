var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/hackathon-2late';
var ObjectID = require('mongodb').ObjectID;

var db;
MongoClient.connect(url, function(err, getdb) {
    if(!err){
        db = getdb;
        db.createCollection( "complaints");
        db.createCollection( "categories");
        db.createCollection( "account_types");
        db.createCollection( "reported_complaints");
        db.collection("account_types").insertOne({name:"anonymous",getComplaints:true,addComplaint:true},function(err,result){
            if(err){
                console.log("\033[31mError creating anonymous account type\x1b[0m");
            }
        });
    }else{
        console.log("\033[31mMongoDB is closed\x1b[0m");
    }
});

module.exports = {
    createAccountType:function (typeName,success,fail) {
        db.collection("account_types").insertOne({name:typeName,getComplaints:false,addComplaint:false},function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    },
    modifyAccountType:function (account_type,success,fail) {
        db.collection("account_types").insertOne(account_type,function(err,result){
            if(!err){
                success();
            }else{
                fail();
            }
        });
    },
    findReportedComplaint:function (complaint,success,fail) {
        db.collection("reported_complaints").findOne({complaint_id:complaint._id},function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    },
    modifyReportedComplaint:function (complaint,success,fail) {
        db.collection("reported_complaints").insertOne(complaint,function(err,result){
            if(!err){
                success();
            }else{
                fail();
            }
        });
    },
    createReportedComplaint:function (complaint,success,fail) {
        db.collection("reported_complaints").insertOne({complaint_id:complaint._id,reports:1,reporters:[]},function(err,result){
            if(!err){
                success();
            }else{
                fail();
            }
        });
    },
    getAccountType:function (typeName,success,fail) {
        db.collection("complaints").findOne({name:typeName},function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    },
    findAllAccountTypes:function (success,fail) {
        db.collection("account_types").find().toArray(function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    },
    findAllComplaints:function (success,fail) {
        db.collection("complaints").find().toArray(function(err,result){
            console.log(result);
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
    addComplain:function(complain,success,fail) {
        console.log(complain);
        db.collection("complaints").insertOne(complain, function (err, result) {
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
    },
    userExists:function (user,success,fail) {
        db.collection("users").findOne({name:user.name,password:user.password},function(err,result){
            if(!err){
                success(result);
            }else{
                fail();
            }
        });
    }
};

