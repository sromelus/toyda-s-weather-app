import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import '../App.css';
import api_key from '../config';

export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      cities: []
    }
  }

  componentDidMount(){
    this.getTemp();
  }


  getTemp = async () => {
    const cities = ['boston, ma', 'chicago, il', 'houston, tx', 'las vegas, nv', 'los angeles, ca', 'miami, fl', 'new york, ny', 'san diego, ca', 'seattle, wa'];

    let data = await Promise.all(
      cities.map(city => {
        return fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`).then(res => res.json())
      })
    );

    console.log(data);

    this.setState({
      cities: data
    })
  }


  render(){


  const citiesData = this.state.cities.map((city, index) => {
   const { name, region } = city.location;
   const { text } = city.current.condition;
   const { temp_f } = city.current;

    return (
      <Link to={name} className="card" key={index}>
        <p>{name + ", " + region}</p>
        <div className="temp">
          <li>{text}</li>
          <li>{temp_f}˚F</li>
        </div>
      </Link>
    )
  })


    return (
      <div className="container">
        <div className="container-main">
          <h1>Today's Weather</h1>

          <Search history ={this.props.history} />

          <div className="cards-container">
            {citiesData}
          </div>
        </div>
      </div>
    );
  }
}
