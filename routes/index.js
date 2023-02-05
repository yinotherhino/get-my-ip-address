var express = require("express");
var router = express.Router();
const axios = require("axios");
const IP = require('ip');
const { config } = require("dotenv");

config();

router.get("/", function (req, res) {
  let ipAddress = IP.address();
  let data;
  axios
    .get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ip_address=${ipAddress}`
    )
    .then(response => {
      console.log(response.data)
      data = response.data
    })
    .catch(console.error)
    .finally(()=>{
      console.log(data)
      res.render("index", {
        ipAddress: "There was an error getting your ip address.",
        data: data || "Error getting ip details",
      });

    })
});

module.exports = router;
