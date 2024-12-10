const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended : true
}));

const PORT = 4002;

const posts = {};

const handleEvents = (type , data) => {
    if(type === 'PostCreated'){
        const {id , title} = data;
        posts[id] = {id , title , comments : []};
    }

    if(type === 'CommentCreated'){
        const {id , content , postId , status} = data;
        const post = posts[postId];
        post.comments.push({id , content , status});
    }

    if(type === 'CommentUpdated'){
        const {id , content , postId , status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts' , (req , res) => {
    res.send(posts);
});


app.post('/events' , (req , res) => {
    const {type , data} = req.body;
    handleEvents(type , data);
    res.status(201).send('OK');
});

app.listen(PORT , async () => {
    console.log('Query Service is live');
    
    const res = await axios.get('http://event-bus-srv:4005/events');

    for(let event of res.data){
        console.log('Processing event : ' , event.type);
        handleEvents(event.type , event.data);   
    }
})