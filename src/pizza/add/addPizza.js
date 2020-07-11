import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import CheckBoxPizza from './checkBoxPIzza';
import InputFile from '../../core/componentes/inputFileComponents';
import ingredienteService from '../../ingrediente/ingrediente-service.js'   
import pizzaService from '../pizza-service.js'
import '@material/react-text-field/dist/text-field.css';
import '@material/react-button/dist/button.css';
import './estiloAddPizza.css';

const rules = {
    name:{
        validation : (value) => value && value.length,
        msg: 'El nombre de la piza es requerido'
    },
    selectedIndex:{
        validation : (value) => value && value.length,
        msg: 'Debe seleccionar al menos un ingrediente' 
    },
    files:{
        validation : (value) => value && value.length,
        msg: 'Debe seleccionar una imagen'
    }
}

function testRules(element,value){
    //for(let rule of rules[element]){
        if(!rules.element.validation(value)){
            return rules.element.msg;
        }
    //}
}

const erroresTextos = {

    name: "Debe indicar nombre de la pizza",
    files: "Debe seleccionar imagen",
    selectedIndex: "Debe seleccionar un ingrediente"

}



export default class AddPizza extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',                       //TextField
            ingredientes: [],               //Collección ingredientes bbdd
            selectedIndex: [],              //CheckBoxIngredientes
            files: [],
            errors: {
                name: false,
                files: false,
                selectedIndex: false
            },
            postError: '',            
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _onBlur = (ev) => {

        const element = ev.target.name;
        const value = ev.target.value;
        //const err = testRules(element,value);
        //this.setState({errors:{pizza:err}});

        if(!value){
            this.setState({errors:{pizza:"El campo no debe estar vacío!!"}})
        }
    }

    _onChange = (ev) => {
        this.setState({ name: ev.currentTarget.value })
        this.setState({errors:{pizza:false}})
    }

    _onBlurInputFile = (ev) => {

        const el = ev.target.getAttribute('name')
        const element = ev.target.name;
        const files = ev.target.files;        

        if(!files){
            this.setState({errors:{img:"Debe seleccionar una imagen!!"}})
        }
        if(this.state.files[0]){
            this.setState({files:files})
        }
    }

    _onChangeInputFile = (files) => (e) => {

        console.log('files changed', files)

        if(files && files[0]){
            this.setState({
                            files:files
            })
        }
        else{this.setState({
                            errors:{
                                files:"Se debe seleccionar una imagen"
                            }
        })}

    }
    
    async getIngredients() {
        const ingredientes = await ingredienteService.getAll();
        this.setState({ ingredientes })
    }
    componentDidMount() {
        this.getIngredients();
    }
    handleSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        const pizza = new FormData();
        pizza.append('name', this.state.name);
        pizza.append('img', this.state.files[0]);
        this.state.selectedIndex.map((i)=>this.state.ingredientes[i].id).forEach((id) =>{
            pizza.append('ingredients[]', id);
        })
        if(!this.state.name){
            alert(erroresTextos.name);
            return
        }

        if(!this.state.selectedIndex.length > 0){
            alert(erroresTextos.selectedIndex);
            return
        }

        if(!this.state.files.length > 0){
            alert(erroresTextos.files);
            return
        }

        //Es necesario indicar el headers para poder generar el json y enviarlo
        pizzaService.post(pizza)
        .then(() => this.setState({
            name: '',                       
            selectedIndex: [],
            files: [],        
            errors: {
                name: false,
                files: false,
                selectedIndex: false
            },
            postError: '',            

        }))
        .catch((err) => this.setState({postError: err}))

        

    }    

    render() {
        if(!this.state.ingredientes.length){
            return <div>Cargando ... </div>
        }
        return (
            <form className='add-pizza' onSubmit={this.handleSubmit}>
                {this.state.postError && <div>error al crear la pizza</div>}
                <TextField label ='Nombre de la pizza'>
                    <Input
                        name='pizza' 
                        isValid={!this.state.errors.pizza}              
                        value={this.state.name}                            
                        onChange={this._onChange}     //(e) => this.setState({ name: e.currentTarget.value })
                        onBlur={this._onBlur} />
                </TextField>
                {this.state.errors.pizza && <p style={{color:"red"}}>{this.state.errors.pizza}</p>}
                
                <div className="scroll">
                    <CheckBoxPizza
                        name="CHBX"
                        checked={this.state.checked} 
                        ingredientes={this.state.ingredientes}  
                        selectedIndex={this.state.selectedIndex}
                        handleSelect={(allSelected) => this.setState({ selectedIndex: allSelected })}
                    />
                </div>

                <InputFile onChange={(files) => {this.setState({files})}} files={this.state.files} onBlur={this._onChangeInputFile}></InputFile>

                {this.state.errors.img && <p style={{color:"red"}}>{this.state.errors.img}</p>}

                <Button className='boton' type='submit' >ENVIAR</Button>
            </form>
        );
    }
}