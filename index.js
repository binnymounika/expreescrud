var express=require('express')

var mongoose=require('mongoose')

var userModel=require('./model/user')
var bodyParser=require('body-parser')
var cors=require('cors')
var app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/newdb")

var db=mongoose.connection
db.on('error',function()
{
    console.log("error in connecting database")
})
db.once('open',function()
{
    console.log("connected to db")
})
   

app.get('/',function(req,res)
{

    res.send("hello from express rest API..")
})
app.get('/get',function(req,res){

userModel.find({},function(err,data)
{
    if(err)
    {
        res.send("error "+err)
    }
    else{
        res.json(data)
    }
})


})
app.get('/get/:location',function(req,res)
{
    var pathParam=req.params.location
    console.log(pathParam)
    userModel.find({location:pathParam},function(err,data)
{
    if(err)
    {
        res.send("error "+err)
    }
    else{
        res.json(data)
    }
})


})

app.delete('/del/:location',function(req,res)
{
    var pathParam=req.params.location
    console.log(pathParam)
    userModel.deleteOne({location:req.params.location}, function (err) {
        if (err) throw err;
        res.send('Deleted successfully!');
    })


})
app.post('/add',function(req,res){

    var um=new userModel()
    um.name=req.body.name
    um.location=req.body.location
    um.year=req.body.year
    um.save(function(err)
    {
        if(err)
        {
            res.send(err)
        }
        else{
            res.json({message:'user created'})
        }
    })


 
})

app.listen(8000)