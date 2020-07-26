import React, { Component } from 'react';
import './App.css';
import api_key from './config';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      cities: []
    }
  }

  componentDidMount(){
    this.getTemp()
  }


  getTemp = async () => {
    const cities = ['boston', 'chicago', 'houston', 'las vegas', 'los angeles', 'miami', 'new york', 'san diego', 'seattle'];

    let data = await Promise.all(
      cities.map(city => {
        return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=boston`).then(res => res.json())
      })
    );

    this.setState({
      cities: data
    })
  }




  render(){

   if(this.state.cities.length > 0){
     console.log(this.state.cities[0].location.name);
   }


    return (
      <div className="container">
        <div className="container-main">
          <h1>Today's Weather</h1>

          <div className="search">
            <form className="" action="index.html" method="post">
              <input type="text" name="" placeholder="Search..."/>
            </form>
          </div>

          <div className="cards-container">
            <a className="card" href="city.html">
              <p>Miami</p>
              <div className="temp">
                <li>79˚F</li>
                <li>Sunny</li>
              </div>
            </a>
            <div className="card">
              <p>Miami</p>
              <div className="temp">
                <li>79˚F</li>
                <li>Sunny</li>
              </div>
            </div>
            <div className="card">
              chicago
            </div>
            <div className="card">
              boston
            </div>
            <div className="card">
              orlando
            </div>
            <div className="card">
              california
            </div>
            <div className="card">
              seattle
            </div>
            <div className="card">
              chicago
            </div>
            <div className="card">
              boston
            </div>
          </div>
        </div>
      </div>
    );
  }
}
