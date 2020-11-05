import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import CityDetailTemp from './components/CityDetailTemp'
// import NotFound from './components/NotFound';


class App extends Component {

render(){
  return (
    <Router>
      <div className="top-content">
        <div className="main-content">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/:id" component={CityDetailTemp} />
        </Switch>
        </div>
        <div className="api-ref">Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></div>
      </div>
    </Router>
  )
  }
}

export default App;
