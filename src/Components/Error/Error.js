
import React from 'react';
// bootswiththefurrrrrr
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Error.css';

class Error extends React.Component {
  refreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <>
        <Jumbotron>
          <h1>If I had a dollar for every time I made a wrong turn. . .  well I would not be here </h1>
          <p id="errorMessage">{this.props.errors}</p>
          <Button onClick={this.refreshPage} variant="danger" type="submit">
            Try your search again
          </Button>
        </Jumbotron>
      </>
    );
  }
}

export default Error;