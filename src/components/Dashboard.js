import React, { Component } from 'react';
import '../App.css';
import api_key from '../config';

export default class Dashboard extends Component {
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
        return fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`).then(res => res.json())
      })
    );

    console.log(data);

    this.setState({
      cities: data
    })
  }

  render(){

  const citiesData = this.state.cities.map((city, index) => {
   const { name } = city.location;
   const { text } = city.current.condition;
   const { temp_f } = city.current;

    return (
      <a className="card" href={name} key={index}>
        <p>{name}</p>
        <div className="temp">
          <li>{text}</li>
          <li>{temp_f}˚F</li>
        </div>
      </a>
    )
  })


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
            {citiesData}
          </div>
        </div>
      </div>
    );
  }
}
