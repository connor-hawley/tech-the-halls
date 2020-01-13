import React, { Component } from 'react';
import { Jumbotron, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Jumbotron id="login">
        <h3>Login</h3>
        <Form>
          <FormGroup>
            {/* <Label for="mentorEmail">Email</Label> */}
            <Input type="email" name="email" id="mentorEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            {/* <Label for="mentorPassword">Password</Label> */}
            <Input type="password" name="password" id="mentorPassword" placeholder="Password" />
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export default LoginComponent;