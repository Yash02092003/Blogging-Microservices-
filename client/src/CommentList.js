import React from "react";

function CommentList({ comments }){

    const renderedComments = comments.map(comment => {
        let content;
        if(comment.status === 'approved'){
            content = comment.content;
        }

        if(comment.status === 'pending'){
            content = 'This comment is awaiting Moderation';
        }

        if(comment.status === 'rejected'){
            content = 'This comment has been rejected';
        }

        return <li key={comment.id}>{content}</li>
    })

    return (
        <div>
            <ul>{renderedComments}</ul>
        </div>
    )
}

export default CommentList