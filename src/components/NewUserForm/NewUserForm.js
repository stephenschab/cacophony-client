import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UserApiService from '../../services/user-api-service';

class NewUserForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = event => {
    event.preventDefault()
    const { user_name, email, password } = event.target

    this.setState({ error: null })
    UserApiService.postUser({
      user_name: user_name.value,
      email: email.value,
      password: password.value
    })
      .then(user => {
        user_name.value = ''
        email.value = ''
        password.value = ''

        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    const { error } = this.state

    return (
      <div>

        <form
          className='NewUserForm'
          onSubmit={this.handleSubmit}
        >

          <div role='alert'>
            {error && <p>{error}</p> }
          </div>
          <div>
            <label htmlFor="user_name">Username</label>
            <input placeholder='user_name' type="text" name='user_name' id='user_name' required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' required/>
          </div>
          <button type='submit'>Sign Up</button>
        </form>

      </div>
    )
  }
}

export default NewUserForm;