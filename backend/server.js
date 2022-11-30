const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser =  require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//cors
if(process.env.NODE_ENV === "development"){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}));
}



//routes
app.get('/api',(req,res)=>{
    res.json({time:Date().toString()});
});

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


