var express=require('express')

var mongoose=require('mongoose')

var app=express()
var db=mongoose.connect("mongodb://localhost:27017/friends",function(err,database)
{
    if(err)
    {
        throw err
    }
    console.log("connected to database")
})

app.get('/',function(req,res)
{

    res.send("hello from express rest API")
})

app.listen(8000)