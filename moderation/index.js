const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4003;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended : true}));

app.post('/events' , async (req , res) => {
    const {type , data} = req.body;
    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events' , {
            type : "CommentModerated" , 
            data : {
                id : data.id,
                postId : data.postId ,
                content : data.content , 
                status : status
            }
        }).catch( err => console.log(err));
    }

    res.send({});
})

app.listen(PORT , () => {
    console.log('Moderation Service is Live');
})