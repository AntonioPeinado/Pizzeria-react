import React from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import authService from "../auth/auth-service";
import { withRouter, Link } from "react-router-dom";
import "@material/react-text-field/dist/text-field.css";
import "@material/react-button/dist/button.css";
import "./login.css";

// TODO: componente para logear usuario
// si esta autenticado redigir a /
// formulario de login y cuando se registre redirigir a /

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }
  componentDidMount() {
    this._checkIfLogedIn();
  }
  _checkIfLogedIn() {
    // si esta autenticado redigir a /
    if (authService.isAuthenticated) {
      this._toHome();
    }
  }
  _toHome() {
    this.props.history.replace("/");
  }
  _onChangeField = (ev, field) => {
    const value = ev.target.value;
    this.setState({ [field]: value });
  };
  _onSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    authService
      .login(this.state.email, this.state.password)
      .then(this._toHome.bind(this))
      .catch((res) => {
        if (res.status === 401) {
          this.setState({ error: "Credenciales incorrectas" });
        } else {
          this.setState({ error: "Ha ocurrido un error insesperado" });
        }
      });
  };

  render() {
    return (
      // formulario de registro y cuando se registre redirigir a /login
      <form onSubmit={this._onSubmit} className="login-form">
        <div className="login-form-title">
          <h2>LOGIN</h2>
        </div>
        <Link to="/register" className="login-form__register">
          Registrarse
        </Link>
        <TextField label="Email">
          <Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(ev) => this._onChangeField(ev, "email")}
          />
        </TextField>
        <TextField label="Password">
          <Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(ev) => this._onChangeField(ev, "password")}
          />
        </TextField>
        <Button className="login-form__button" type="submit">
          Login
        </Button>
        {this.state.error && (
          <div type="alert" className="login-form-error">
            {this.state.error}
          </div>
        )}
      </form>
    );
  }
}

export default withRouter(Login);
