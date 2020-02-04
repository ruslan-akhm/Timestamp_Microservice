
const express = require("express");
const app = express();


app.get("/api/timestamp/:date_string?",(req,res)=>{
  const date_string = req.params.date_string;
  const int_date = parseInt(date_string); // Have req as integer stored in here
  const dash = /[-]/;
  //console.log("string"+new Date(date_string))
  //console.log(new Date(date_string).toUTCString())
  //console.log("string"+new Date(int_date))
  //console.log(new Date(int_date).toUTCString())
  
  //Checking for empty string in a req
  if(!date_string && isNaN(int_date)/*typeof date_string=="undefined"||date_string.length<1*/){ 
    console.log("Empty req was received")
    const emptyUnix=new Date().getTime();
    const emptyUtc=new Date().toUTCString();
    res.json({"unix":emptyUnix,"utc":emptyUtc});
    return;
  };
  //Checking If date is invalid e.g. tdew5fsd
  if(new Date(date_string)=="Invalid Date" && date_string.length!==int_date.length && new Date(int_date)=="Invalid Date"){ 
    res.json({"error" : "Invalid Date"});
    return;
  };
  
  //Checking for ISO format e.g. 2016-10-10
  if(dash.test(date_string) && new Date(date_string).toUTCString()!=="Invalid Date"){
    console.log("yyyy-mm-dd req was received")
    const dateUnix=Date.parse(date_string);
    const dateUtc=new Date(date_string).toUTCString();
    res.json({"unix":dateUnix,"utc":dateUtc});
    return;
  }
  //Checking if unix was received
  if(new Date(int_date)!=="Invalid Date"){
    console.log("unix was received")
    res.json({"unix":int_date,"utc":new Date(int_date).toUTCString()})
    return
  }
  
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})
