import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import CityDetailTemp from './components/CityDetailTemp'
// import NotFound from './components/NotFound';


class App extends Component {

render(){
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/:id" component={CityDetailTemp} />
        </Switch>
        <div className="api-ref">Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></div>
      </div>
    </Router>
  )
  }
}

export default App;
