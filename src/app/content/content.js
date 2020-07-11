import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../home/pagina-inicio';

const PizzaList = React.lazy(() => {
  return import('../../pizza/list/pizza-list');
});

const AddPizza = React.lazy(() => {
  return import('../../pizza/add/addPizza.js');
});

const PizzaDetail = React.lazy(() => {
  return import('../../pizza/detail/detail');
});

const PageNotFound = React.lazy(() => {
  return import('../not-found/PageNotFound');
})

function Content() {
  return (
    <React.Suspense fallback={<div>Loading .... </div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pizzas" component={PizzaList} />
        <Route exact path="/pizzas/add" component={AddPizza} />
        <Route exact path="/pizzas/:id" component={PizzaDetail} />
        <Route path="/not-found" component={PageNotFound} />
        <Route>
          <Redirect to="/not-found"></Redirect>
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default Content;





