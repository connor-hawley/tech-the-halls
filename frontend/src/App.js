import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import LoginComponent from './components/LoginComponent';

// const LoginPage = () => <div>This is a Login Page</div>
const RegisterPage = () => <div>This is a Register Page</div>
const HomePage = () => <div>This is a Home Page</div>
const RequirementsPage = () => <div>This is an Requirements Page</div>
const AdminPage = () => <div>This is an Admin Page</div>

function App() {
  return (
    <Router>
      <div>
        <NavComponent />

        <Switch>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/requirements">
            <RequirementsPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginComponent />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;