const express = require('express'); //EXPRESS
const app = express(); //DECLARATION OF APP
const port = process.env.PORT || 5000; //PORT FOR HOSTING



app.get('/', (req,res) => {
    res.send('0p')
    console.log('0p');
})


app.listen(port, (req, res) => {
    console.log('server is running at http://localhost:5000');
})




