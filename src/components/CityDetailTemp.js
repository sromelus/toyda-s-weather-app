import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api_key from '../config';

export default class CityDetailTemp extends Component {
  constructor(){
    super()
    this.state = {
      alert: {},
      current: {},
      condition: {},
      forecast: [],
      location: {
        name: '',
        country: '',
        region: ''
      },
      comma: '',
      error: false
    }
  }


  // componentDidUnmount() {
  //   this.setState({
  //     ...this.state,
  //     error: false
  //   })
  // }

  componentDidMount(){
    let city = this.props.match.params.id;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=7`)
      .then(response => {
        if(response.status >= 400 && response.status <= 500) {
          this.setState({
            ...this.state,
            error: true
          })
        } else if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          alert: data.alert,
          current: data.current,
          condition: data.current.condition,
          forecast: data.forecast.forecastday,
          location: data.location,
          comma: ', '
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }


  render(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { name, region, country } = this.state.location;
    const { temp_f } = this.state.current;
    const { icon, text } = this.state.condition;
    const { comma } = this.state;


    const forecast = this.state.forecast.map((day, index) => {
      const { avgtemp_f } = day.day;
      const { icon, text } = day.day.condition;
      const date = day.date.replace("2020-", "");
      const tday = new Date(day.date).getDay();


      return (
        <div className="card-temp" key={index} >
          {days[tday]} {date} <br/><br/>
          Temp: {avgtemp_f}˚F <br/>
          <div className="forcast-cards">
            <img src={icon} alt=""/>
            <div>
              <span>{text}</span>
            </div>
          </div>
        </div>
      )
    })

    console.log(this.state);

    return (
      <div className="container">
        <Link to={'/'} className="card">
        Back
        </Link>

        <div className="container-main">
          { this.state.error ?
            <>
            <h1>City location not found </h1>
            <img className="error" src={"https://www.flaticon.com/premium-icon/icons/svg/3296/3296271.svg"} alt=""/>
            </>
            :
            <>
              {country === "United States of America" ?
                <h1>{name + comma + region}</h1>
                :
                <h1>{name + comma + country}</h1>
              }

              <div className="current-weather">
                <h3>Current Weater</h3>
                <div className="current-weather-main">
                  <div className="current-weather-image">
                    <img src={icon} alt=""/> <span>{text}</span>
                  </div>
                  <div className="current-weather-info">
                  Temperature: {temp_f}˚F
                  </div>
                </div>
              </div>

              <div className="daily-temp-container">
                { country ?
                  forecast
                  :
                  <h3> Loading forecast... </h3>
                }
              </div>
            </>
          }
        </div>

      </div>
    );
  }
}
