require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const mongo = require("./connect");
const mongo2 = require("./Connection2");
const cors = require("cors");
const app = express();
const registerrouter = require("./routes/register");
// const authorisationmodule= require("./module/authorizationmodule");
const golddata = require("./routes/Golddata");
const todayprice = require("./routes/admin");
const contactus = require("./routes/contactus");
const assign = require("./routes/assign")
const addmember = require("./module/marketingteam");



(async () => {
  try {
    await mongo.connect();
    await mongo2.connect()

    app.use(express.json());

    app.use(cors());
     
    app.use("/register",registerrouter);
    app.use("/all",golddata);
    app.use("/enquiry",contactus);
    // app.use(authorisationmodule.authorizeuser);
    app.use("/add",todayprice);
    app.use("/public",express.static('public'));
    app.use("/marketing",addmember);
    app.use("/contact",assign)
    
   
    
    
  
    

    app.listen(PORT, () => {
      console.log(`API is ready on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("error starting our application",error);
  }
})();
