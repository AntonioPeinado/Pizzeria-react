import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import authService from '../auth/auth-service';
import { withRouter } from 'react-router-dom';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-button/dist/button.css';
import './register.css';
import config from '../core/config';
// TODO: componente para registrar usuarios

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }
    componentDidMount() {
        this._checkIfLogedIn();
    }
    _checkIfLogedIn() {
        // si esta autenticado redigir a /
        if (authService.isAuthenticated) {
            this.props.history.replace('/');
        }
    }
    _onFieldChange(ev, field){
        const value = ev.target.value;
        this.setState({ [field]: value });
    }
    // post a /register asumiendo que los datos son correctos
    _onSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const {name, email, password} = this.state;
        const userRegister = {
            name,
            email,
            password,
        };
        return fetch(`${config.apiURL}/register`, {
            method: 'POST',
            body: JSON.stringify(userRegister),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this._onRegistered.bind(this))
            .catch(this._onUncontrolledError.bind(this))
    }
    _onRegistered(res) {
        //201
        if (res.status === 201) {
            this._onRegisterSuccess()
        }
        //400
        else if (res.status === 400) {
            this._onRegisterFailed(res)
        }
        //error
        else {
            this._onUncontrolledError()
        }
    }
    async _onRegisterFailed(res) {
        const body = await res.json();
        this.setState({ error: body.error })
    }
    _onRegisterSuccess() {
        this.props.history.replace('/login');
    }
    _onUncontrolledError() {
        this.setState({ error: 'No se ha podido registrar el usuario' })
    }

    render() {
        return (
            // formulario de registro y cuando se registre redirigir a /login
            <form onSubmit={this._onSubmit} className='register-form' >
                {this.state.error && <div role='alert'>{this.state.error}</div>}
                <TextField label='Nombre'>
                    <Input type='name'
                        name='nombre'
                        value={this.state.name}
                        onChange={(ev) => this._onFieldChange(ev,'name')}
                    />
                </TextField>
                <TextField label='Email'>
                    <Input type='email'
                        name='email'
                        value={this.state.email}
                        onChange={(ev) => this._onFieldChange(ev,'email')}
                    />
                </TextField>
                <TextField label='Password'>
                    <Input type='password'
                        name='password'
                        value={this.state.password}
                        onChange={(ev) => this._onFieldChange(ev,'password')}
                    />
                </TextField>
                <Button className='register-form__button' type='submit' >Registrarse</Button>
            </form>
        );
    }
}

export default withRouter(Register);