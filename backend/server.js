const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser =  require('cookie-parser')
const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

const app = express()
//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//cors
if(process.env.NODE_ENV === "development"){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}));
}


// database connection
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});


//routes
app.get('/api',(req,res)=>{
    res.json({time:Date().toString()});
});

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


