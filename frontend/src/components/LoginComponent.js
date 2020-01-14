import React, { Component } from 'react';
import { Jumbotron, Form, FormGroup, Input, Container, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Jumbotron id="login" className="col-md-4">
          <h3>Mentor Login</h3>
          <Form>
            <FormGroup>
              <Label for="mentorEmail">Email</Label>
              <Input type="email" name="email" id="mentorEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="mentorPassword">Password</Label>
              <Input type="password" name="password" id="mentorPassword" placeholder="Password" />
            </FormGroup>
          </Form>
          <Button>Log In</Button>
        </Jumbotron>
      </Container>
    );
  }
}

export default LoginComponent;