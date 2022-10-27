'use strict';

import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

class Movie extends React.Component {

  render() {
    return (
      // console.log('movie lion rwar');
      <div>
        <Container>
          <img src={this.props.movie.image_url} alt={this.props.movie.title} />
          <h2>{this.props.movie.title}</h2>
          <p>{this.props.movie.overview}</p>
          <p id="sm">Average votes: {this.props.movie.average_votes}</p>
          <p id="sm">Total votes: {this.props.movie.total_votes}</p>
          <p id="sm">Popularity: {this.props.movie.popularity}</p>
          <p id="med">Realease date: {this.props.movie.released_date}</p>
        </Container >
      </div >
    );
  }
}
export default Movie;