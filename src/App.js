'use strict';

import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Header from './Components/Header/Header.js';
import City from './Components/City/City.js';
import Search from './Components/Search/Search.js';
import Error from './Error/Error.js';
import Weather from './Components/Weather/Weather.js';
import Movies from './Components/Movies/Movies.js';
import Footer from './Components/Footer/Footer.js';

import './App.css';


////from class//////
// this.getWeatherData(cityToDisplay);

// this.setState({
//   cityData: cityToDisplay;
//   map: mapURL,
//   error: false,
// });


// getWeatherData = async (location) => {
//   try {
//     //TODO: axios to hit my backend server - need to send it cityName, lat, lobn
//     let url = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.city}&lat=${location.lat}&lon${location.lon}`

//     console.log('weather url', url);
    
//     let weatherData = await axios.get ()

//     comnsole.log('weather from backend' weatherData.data);
//   } catch (error) {
//     this.setState({
//       error: true,
//       errorMessage: error.message
//     })
//   }
// }

//////no more class below///

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        haveSearched: false,
        cityInput: '',
        cityData: {},
        errors: [],
        cityName: '',
        // backend server : locationIq
        latitude: '',
        longitude: '',
        // backend server : weathbit API
        forecast: [],
        // backend server : movie database API
      movies: [],
      };
    }


    showSearch = () => {
        this.setState({ haveSearched: false });
      }

      handleSearch = async (cityInput) => {
        // console.log('searched', cityInput);
        try {
          let locationResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${cityInput}&format=json&limit=1`);
          // console.log(locationResponse.data[0]);
          console.log('display name', locationResponse.data[0].display_name);
          console.log('latitude', locationResponse.data[0].lat);
          console.log('longitude', locationResponse.data[0].lon);
    
          this.setState({
            haveSearched: true,
            cityInput: cityInput,
            cityData: locationResponse.data[0],
            // show city lat and long helped by reddit forum
            cityName: locationResponse.data[0].display_name,
            latitude: locationResponse.data[0].lat,
            longitude: locationResponse.data[0].lon,
          });
        } catch (err) {
          // console.log(err);
          this.setState({
            errors: `${err}`,
            haveSearched: false,
          });
        }
        // suitable line break @ the end to call it in . . .
        this.fetchWeather();
        this.fetchMovies();
    }

    fetchWeather = async () => {
        try {
          // local host will need to be placed in the .env file
          // after heroku deployment update to the deployed url
          // const dailyForecast = await axios.get(`${WEATHER_URL}?&lat=0000&lon=0000`);
          const dailyForecast = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`,
            {
              params: {
                lat: this.state.latitude,
                lon: this.state.longitude
              }
            });
          // console.log('This is the daily forecast:', dailyForecast.data);
          // updating the state
          // console.log(`setting state here:`);
          this.setState({
            forecast: dailyForecast.data
          });
        } catch (error) {
          this.setState({ errors: `${error.message}` });
          // console.log('Error Found:', error.message);
        }
      }

      fetchMovies = async () => {
        try {
          const movieInformation = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`,
            {
              params: {
                location: this.state.cityInput
              }
            });
          // console.log('This is the movie information:', movieInformation.data);
          // updating the state
          // console.log(`setting state here:`);
          this.setState({
            movies: movieInformation.data
          });
        } catch (error) {
          this.setState({ errors: `${error.message}` });
          // console.log('Error Found:', error.message);
        }
      }

        render() {
    // console.log(this.state);
    return (
      <>
        <Header />
        {
          this.state.haveSearched && this.state.errors.length === 0 ?
            <City handleShowSearch={this.showSearch} cityData={this.state.cityData} /> :
            this.state.errors.length !== 0 ?
              <Error handleSearch={this.handleSearch} errors={this.state.errors} error={this.state.error} /> :
              <Search handleSearch={this.handleSearch} />
        }
        <Container>
          <Weather handleShowSearch={this.showSearch} forecast={this.state.forecast} />
        </Container>
        <Container>
          <Movies handleShowSearch={this.showSearch} movies={this.state.movies} />
        </Container>
        <Footer />
      </>
    );
  }
}
export default App;