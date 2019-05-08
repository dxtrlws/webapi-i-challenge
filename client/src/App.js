import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Users from './Components/Users';
import { Route, Link } from 'react-router-dom';
import UserForm from './Components/UserForm';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:9090/api/users')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addUser = user => {
    const { users } = this.state;
    this.setState({
      users: [...users, user]
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className='App'>
        <h1>Users</h1>
        <Link to='/userform'>Add User</Link>
        {/* <Users users={users} /> */}
        <Route
          exact
          path='/'
          render={props => <Users {...props} users={users} />}
        />
        <Route
          exact
          path='/userform'
          render={props => <UserForm {...props} addUser={this.addUser} />}
        />
      </div>
    );
  }
}

export default App;
