const {MongoClient} = require("mongodb");

const mongo={
    pricedata:null,

    async connect(){
        try{
            const client = new MongoClient(process.env.MONGODB_URL2);
            await client.connect();
            console.log("mongo db drive connected successfully");

            const db = await client.db(process.env.MONGODB_NAME);
            console.log(`selected database-${process.env.MONGODB_NAME}`);

            this.pricedata = db.collection("pricedata");
           

        }catch(err){
            console.error("error connecting to mongodb",err);
        }
    },

};

module.exports = mongo;