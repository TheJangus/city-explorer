import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './City.css';

class City extends React.Component {
  render() {
    // console.log('i put on for my city!');
    return (
      <>
        <Button onClick={this.props.handleShowSearch} variant="primary" type="submit">
          Search again
        </Button>
        <h2>{this.props.cityData.display_name}</h2>
        <h3>Latitude: {this.props.cityData.lat}</h3>
        <h3>Longitude: {this.props.cityData.lon}</h3>
        <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=14`} alt="city map" title="Return search map" fluid />
      </>
    );
  }
}

export default City;