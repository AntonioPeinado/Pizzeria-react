import React from "react";
import ReactDOM from "react-dom";
import LinearProgress from "@material/react-linear-progress";
import "@material/react-linear-progress/dist/linear-progress.css";
import "./styles/base.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./styles/styleguide.css";
import authService from "./auth/auth-service";

const App = React.lazy(() => import("./app/app.js"));
const Login = React.lazy(() => import("./login/login.js"));
const Register = React.lazy(() => import("./register/register"));

authService
  .refresh()
  .catch(() => {}) //catch vacio para que no salga el error en consola
  .finally(() => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <React.Suspense fallback={<LinearProgress indeterminate />}>
            <Switch>
              <Route path="/login" component={Login} exact={true} />
              <Route path="/register" component={Register} exact={true} />
              <Route
                path="/"
                render={() => {
                  if (!authService.isAuthenticated) {
                    return <Redirect to="/login" />;
                  }
                  return <App />;
                }}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
