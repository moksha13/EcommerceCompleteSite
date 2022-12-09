const mongoose = require("mongoose")

const connectDatabase = ()=>{
    //console.log('called');
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        }).then((data)=>{
            console.log(`DB connected ${data.connection.host}`);
        });
        
        
        
}

module.exports= connectDatabase