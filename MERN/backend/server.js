const app = require('./app');
const dotenv = require('dotenv')
const connectDatabase = require('./config/database');
const { mongo, default: mongoose } = require('mongoose');


//Handling uncaught Exception 
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to un caught exception`);
    process.exit(1)
})

//config

dotenv.config({path:'backend/config/config.env'})

connectDatabase()

const server = app.listen(process.env.PORT ,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
})

//console.log(youtube)
//Unhandled Promise Rejection
process.on("unhandledRejection", err =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })

})