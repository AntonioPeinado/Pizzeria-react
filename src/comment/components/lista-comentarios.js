import React from 'react';
import List, {ListItem} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-list/dist/list.css';
import './lista-comentarios.css'

export function CommentList (props) {
    return(
        <List>
            {props.comments.map((comment) =>{
               return <ListItem key={comment.id} className='comment'> <CommentItem comment={comment}/> </ListItem>
           })} 
        </List>
    )
}
function CommentItem({comment}){
    return (
        <div className='pizza-comment'>
            <div className='pizza-comment__header'>
                <div className="pizza-comment__header__left">
                    <div>{comment.user.name}</div>
                    <div>{comment.created}</div>
                </div>
                <div>
                    {Array.from({length:comment.score}).map((_,i)=>{
                        return <MaterialIcon key={i} icon='star_rate'/>
                    })}
                </div>
            </div>         
            <div className='pizza-comment__body'>            
                {comment.text}
            </div>
        </div>
        ); 
}