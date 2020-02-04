
const express = require("express");
const app = express();


app.get("/api/timestamp/:date_string?",(req,res)=>{
  const date_string = req.params.date_string;
  const int_date = parseInt(date_string); // Have req as integer stored in here
  const dash = /[-]/;
  //console.log("string"+new Date(date_string))
  //console.log(new Date(date_string).toUTCString())
  //console.log("integer"+new Date(int_date))
  //console.log(new Date(int_date).toUTCString())
  
  if(typeof date_string=="undefined"||date_string.length<1){ //if empty req; Should check for empty request first  !!
    console.log("Empty req was received")
    const emptyUnix=Date.now();
    const emptyUtc=new Date().toUTCString();
    res.json({"unix":emptyUnix,"utc":emptyUtc});
    return;
  };
  
  if(new Date(date_string)=="Invalid Date" && new Date(int_date)=="Invalid Date"){ //If date is invalid e.g. tdew5fsd
    res.json({"error" : "Invalid Date"});
    return;
  };
  
  
  if(dash.test(date_string) && new Date(date_string).toUTCString()!=="Invalid Date"){// e.g. 2016-10-10
    console.log("yyyy-mm-dd req was received")
    const dateUnix=Date.parse(date_string);
    const dateUtc=new Date(date_string).toUTCString();
    res.json({"unix":dateUnix,"utc":dateUtc});
    return;
  }
  if(new Date(int_date)!=="Invalid Date"){//unix was received
    console.log("unix was received")
    res.json({"unix":int_date,"utc":new Date(int_date).toUTCString()})
    return
  }
  
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})