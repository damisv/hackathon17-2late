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
        db.createCollection( "users");
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
    createAccountType:function (typeName) {
        return db.collection("account_types").insertOne({name:typeName,getComplaints:false,addComplaint:false});
    },
    modifyAccountType:function (account_type) {
        return db.collection("account_types").insertOne(account_type);
    },
    findReportedComplaint:function (complaint,success,fail) {
       return db.collection("reported_complaints").findOne({complaint_id:complaint._id});
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
    findAllAccountTypes:function () {
        return db.collection("account_types").find().toArray();
    },
    findAllComplaints:function () {
        return db.collection("complaints").find().toArray();
    },
    findComplaintById:function (id) {
        return db.collection("complaints").findOne({_id:ObjectID(id)}).toArray();
    },
    findAllCategories:function () {
        return db.collection("categories").find().toArray();
    },
    addCategory:function(category) {
        return db.collection("categories").insertOne({name: category});
    },
    addComplain:function(complain) {
        return db.collection("complaints").insertOne(complain);
    },
    addUser:function(complain) {
        return db.collection("users").insertOne(user);
    },
    removeCategory:function(category){
        return db.collection("categories").deleteOne({_id:ObjectID(category._id)})
    },
    removeComplaint:function(complaint){
        return db.collection("complaints").deleteOne({_id:ObjectID(complaint._id)})
    },
    removeComplaintsOfCategory:function(category){
        return db.collection("complaints").deleteMany({category:category})
    },
    removeAllComplaints:function(){
        return db.collection("complaints").deleteMany({})
    },
    findDistinctCategoriesFromComplaints:function(){
        return db.collection("complaints").distinct("category")
    },
    userExists:function (user,success,fail) {
        return db.collection("users").findOne({name:user.name,password:user.password});
    },
    createUser:function(user) {
        return db.collection("users").insertOne(user);
    }
};

