import React, { Component } from 'react';
import axios from 'axios';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: ''
    };
  }
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    const { name, bio } = this.state;
    const { addUser, history } = this.props;
    const user = {
      name,
      bio
    };
    axios
      .post('http://localhost:9090/api/users', user)
      .then(res => {
        addUser(res.data);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { name, bio } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type='text'
            value={name}
            name='name'
            placeholder='name'
            onChange={this.changeHandler}
          />
          <textarea
            type='text'
            value={bio}
            name='bio'
            placeholder='Bio..'
            onChange={this.changeHandler}
          />
          <button onClick={this.submitHandler} type='submit'>submit</button>
        </form>
      </div>
    );
  }
}
