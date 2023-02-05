var express = require("express");
var router = express.Router();
const axios = require("axios");
const IP = require('ip');
const { config } = require("dotenv");

config();

router.get("/", (req, res)=> {
  let ipAddress = IP.address();
  let [data, latitude, longitude]= [,,,];
  axios.get(`https://ipinfo.io/${ipAddress}?token=${process.env.API_KEY}`)
  .then(response=>{
    data= response.data
    console.log(response.data)
    const loc = data.loc.split(",")
    [latitude, longitude] = loc || [0,0]
  })
  .catch(console.error)
  .finally(()=>{
    res.render("test", {
      ipAddress: ipAddress || "There was an error getting your ip address.",
      data: data || "Error getting ip details",
      latitude,
      longitude,
      country:data.country,
      region:data.region,
      timezone:data.timezone
    });

      })
});

module.exports = router;
