import React from 'react';
import {commentsService} from '../services/comment-service';
import './add-comments.css';
import Button from '@material/react-button';
import TextField, {Input } from '@material/react-text-field';
import '@material/react-button/dist/button.css';
import '@material/react-text-field/dist/text-field.css';

const rules ={
      comment:[{
          validator: (value) => value && value.length,
          message: 'El commentario es obligatorio'
      },
      {
          validator: (value) => value && value.length >10,
          message: 'El comentario tiene que tener más de 10 caracteres'
      },
      {
          validator: (value) => value && value.length < 300,
          message: 'El comentario tiene que tener menos de 300 caracteres'
      }
    ]
}

export class AddComments extends React.Component {
    constructor(pronps){
        super(pronps);
        this.state=({
            comment:'',
            score: undefined,
            commentError:  undefined
             
        });  
    }
    
    _onSubmit = (event) =>{ 
        event.preventDefault();
        event.stopPropagation();
        const commentError = this._getCommentError(this.state.comment);
        if(commentError){
            const commentError = this._getCommentError(this.state.comment);
            this.setState({commentError});
            return;
        };
       const comment = {
            text: this.state.comment,
            score: Number(this.state.score) || 5,
            pizza: this.props.pizzaId
         }
       commentsService.post(comment, {
            headers: { 'Content-Type': 'application/json' }
        }).then(() => this.setState({
            comment: '',
            score: '',
            commentError: null,
            formError: null
        }))
        .catch((err) => this.setState({ formError: err }))
    }       
    _validateScore(value){
        return value >= 0 && value <= 10;
    }
    _onScoreChange = (event) =>{
        const value = Number(event.target.value);
        const isValid = this._validateScore(value);
        if(!isValid){
            event.preventDefault();
            return;
        }
        this.setState({score: value});
    }
       
    _onCommentBlur = () =>{
        const commentError = this._getCommentError(this.state.comment);
        this.setState({commentError});
    }
    _getCommentError(value){
       for(let rule of rules.comment){
        if(!rule.validator(value)){
            return rule.message;
        }
    }  
 }
    _onCommentChange = (event) =>{
        const value = event.target.value;
        this.setState({ comment: value  }); 
    }
    getClassName(){
        return this.props.className || '';
    }
   
   render(){
       return(
           <form onSubmit={this._onSubmit} className={'pizza-comments__form ' + this.className}>
               {this.state.formError && <div role="alert">El comentario no pudo crearse pruebe en unos minutos</div>}
               <TextField label='comment' textarea>
                   <Input
                    name='comment'
                    isValid={!this.state.commentError}
                    inputType='textarea'
                    value={this.state.comment}
                    onChange={this._onCommentChange}
                    onBlur={this._onCommentBlur} 
                       />
                </TextField>
                {this.state.commentError && <p class="pizza-comments__error">{this.state.commentError}</p>}
                    <div className='pizza-comments__bottom'>
                        <TextField label='score' className='pizza-comments__score'>
                            <Input className='pizza-comments__input'
                            name='score'
                            type='number'
                            value={this.state.score}
                            onChange={this._onScoreChange}
                           onBlur={this._validateScore} />
                        </TextField>
                        <Button className='button' type='submit'>Enviar</Button>     
                   </div>
           </form>
       );
   }
}