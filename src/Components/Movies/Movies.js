import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movies.css';

import Movie from './Movie';

class Movies extends React.Component {
  render() {
    // console.log('i give it two thumbs up');
    if (this.props.movies.length === 0) {
      return ('');
    }
    return (
      <>
        <Container>
          <h1>🎥 What's been filmed here? 🎬</h1>
          {
            this.props.movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))
          }
        </Container>
      </>
    );
  }
}

export default Movies;