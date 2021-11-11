import React from 'react'
import Toggable from './Toggable'
import propTypes from 'prop-types'
export default function LoginForm (props) {
  return (
    <Toggable buttonLabel='Show login'>
      <form onSubmit={props.handleLogin}>
        <div>
          <input
            type='text'
            value={props.username}
            name='Username'
            placeholder='Username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={props.password}
            name='Password'
            placeholder='Password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id='form-login-button'>
          Login
        </button>
      </form>
    </Toggable>
  )
}

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  username: propTypes.string
}
