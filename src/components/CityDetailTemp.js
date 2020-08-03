import React, { Component } from 'react';
import api_key from '../config';

export default class CityDetailTemp extends Component {
  constructor(){
    super()
    this.state = {
      alert: {},
      current: {},
      condition: {},
      forecast: [],
      location: {}
    }
  }

  // fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${currentTag}&per_page=24&format=json&nojsoncallback=1`)
  //   .then(response => {
  //     if(response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`
  //       const error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     if (this.componentisMounted) {
  //       this.setState({
  //         imageData: response.photos.photo,
  //         statusText: response.stat
  //       })
  //     }
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`))

  componentDidMount(){
    let city = this.props.match.params.id;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=7`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          alert: data.alert,
          current: data.current,
          condition: data.current.condition,
          forecast: data.forecast.forecastday,
          location: data.location
        })
      })
  }

  render(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { name } = this.state.location;
    const { temp_f } = this.state.current;
    const { icon, text } = this.state.condition;

    // console.log(this.state.forecast.day);

    const forecast = this.state.forecast.map((day, index) => {
      const { avgtemp_f } = day.day;
      const { icon, text } = day.day.condition;
      const tday = new Date(day.date).getDay();
      console.log(tday);

      return (
        <div className="card-temp" key={index} >
          {days[tday]} <br/>
          {avgtemp_f} <br/>
          {text}
        </div>
      )
    })


    return (
      <div className="container">
        <div className="container-main">
          <h1>{name}</h1>

          <div className="current-weather">
            <h3>Current Weater</h3>
            <div className="current-weather-main">
              <div className="current-weather-image">
                <img src={icon} alt=""/> <span>{text}</span>
              </div>
              <div className="current-weather-info">
                temperature: {temp_f}˚F
              </div>
            </div>
          </div>

          <div className="daily-temp-container">
            {forecast}
          </div>
        </div>
      </div>
    );
  }
}
