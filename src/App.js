import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import CityDetailTemp from './components/CityDetailTemp'
// import NotFound from './components/NotFound';


class App extends Component {

render(){
  return (
    <BrowserRouter >
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/:id" props={'red tape'} component={CityDetailTemp} />
        </Switch>
      </div>
    </BrowserRouter>
  )
 }
}

export default App;
