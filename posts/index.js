const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const app = express();
const PORT = 4000;
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended : true}));
app.use(cors());

const posts = {};

app.get('/posts' , (req , res) => {
    res.send(posts);
})

app.post('/posts/create' , async (req , res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id , title
    };
    console.log('Event Received');

    await axios.post ('http://event-bus-srv:4005/events' , {type : 'PostCreated' , data : {id , title}});

    res.status(201).send(posts[id]); 
})

app.post('/events' , async (req , res) => {
    
})

app.listen(PORT , () => {
    console.log('v21');
    console.log('POSTS servise is live. ');
})