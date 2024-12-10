const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 4001;
const commentsByPostId = {};

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.post('/posts/:id/comments' , async (req , res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id : commentId , content , status : 'pending'});

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events' , {
        type : 'CommentCreated' , 
        data : {
            id : commentId ,
            content ,
            postId : req.params.id ,
            status : 'pending'
        }
    }).catch(err => console.log(err));

    res.status(201).send(commentsByPostId[req.params.id]);
})

app.get('/posts/:id/comments' , (req , res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/events' , async (req , res) => {
    const {type , data} = req.body;
    if(type === 'CommentModerated'){
        const {postId , id , status , content} = data
        const comments = commentsByPostId[data.postId];
        const comment = comments.find(comment => {
            return comment.id === data.id;
        })
        comment.status = data.status;

        await axios.post('http://event-bus-srv:4005/events' , {
            type : 'CommentUpdated' , 
            data : {
                id ,
                status ,
                postId ,
                content
            }
        })
    }

    res.send({});
    
});

app.listen(PORT , ()=>{
    console.log('COMMENTS Service is Live');
})