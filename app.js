require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const mongo = require("./connect");
const cors = require("cors");
const app = express();
const registerrouter = require("./routes/register");
const authorisationmodule= require("./module/authorizationmodule");

(async () => {
  try {
    await mongo.connect();

    app.use(express.json());

    app.use(cors());
     
    app.use("/register",registerrouter);
    app.use(authorisationmodule.authorizeuser);
    
  
    

    app.listen(PORT, () => {
      console.log(`API is ready on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("error starting our application",error);
  }
})();
