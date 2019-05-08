import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
 import Users from './Components/Users';

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

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <h1>hello</h1>
        <Users users={users} />
      </div>
    );
  }
}

export default App;
