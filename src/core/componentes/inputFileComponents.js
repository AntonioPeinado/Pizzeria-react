import React from 'react'
import {v4 as uuidv4} from 'uuid';
/**
 * // input con type file
   // cuando se selecciona un fichero salta el evento change
   // los ficheros subidos estan en la propiedad files
   // si queremos previsualizarlos podemos crear una url con URL.createObjectURL
 */
export default class InputFileComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            src : null
        }
        this._id = uuidv4();
    }
    _onChange = (ev) => {   
        const files = ev.target.files;
        this.props.onChange(files);
    }
    componentDidUpdate(prevProps){
        if(this.props.files !== prevProps.files){
            this._revokeImg();
            const src = this.props.files[0] &&  URL.createObjectURL(this.props.files[0])
            this.setState({src});
        }
    }
    componentWillUnmount(){
        this._revokeImg();
    }
    _revokeImg(){
        if(this.state.src){
            URL.revokeObjectURL(this.state.src);
        }
    }
    render() {
        return (
            <div>
                <input type="file" files={this.props.files} id={this._id} hidden onChange={this._onChange} accept="image/png, .jpeg, .jpg, image/gif"></input>
                <label tabIndex="0" htmlFor={this._id} style={{cursor:'Pointer'}}>Subir fichero</label>                
                {this.state.src && <img id="img" src={this.state.src} alt="La imagen subida"/>}
            </div>
        )
    }
}