const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth');
const jobRoutes = require("./Routes/job");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('./public'))
app.use(cors());




app.get('/health', (req, res) => {
    res.status(200).json({
        service: "job-listing-server",
        status: "active",
        time: new Date(),

    })
})

app.get('/', (req, res) => {
    res.send('server connected successfully')
})


//Register Routes
app.use(authRoutes);
app.use(jobRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});



app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
        .catch(error => console.log(error));
})