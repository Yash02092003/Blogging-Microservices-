const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4005;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended : true}));

const events = [];

app.post('/events' , (req , res) => {
    const event = req.body;

    events.push(event);
    axios.post('http://posts-clusterip-srv:4000/events' , event).catch( err => console.log(err));
    axios.post('http://comments-srv:4001/events' , event).catch( err => console.log(err));
    axios.post('http://query-srv:4002/events' , event).catch( err => console.log(err));
    axios.post('http://moderation-srv:4003/events' , event).catch( err => console.log(err));

    res.send({status : "OK"});
})

app.get('/events' , async (req , res) => {
    res.send(events);
})

app.listen(PORT , () => {
    console.log("Event Bus is live");
})