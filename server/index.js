const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('./public'))
app.use(cors());



app.get('/',(req,res)=>{
    res.send('server connected uccessfully')
})
app.listen(process.env.PORT,() => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
      .catch(error => console.log(error));
  })