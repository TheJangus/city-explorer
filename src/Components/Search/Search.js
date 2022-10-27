import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput : React.createRef()
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.textInput.current.value);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Enter a city to begin</Form.Label>
          <Form.Control placeholder="A great city is not to be confounded with a populous one..." size="lg" type="text" ref={this.state.textInput} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Explore!
        </Button>
      </Form>
    );
  }
}

export default Search;
