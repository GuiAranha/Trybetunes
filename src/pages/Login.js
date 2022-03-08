import React from 'react';
import PropType from 'prop-types';

class Login extends React.Component {
  render() {
    const { btnDisabled, nameValue, enableButtonLogin, submitLogin } = this.props;

    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form onSubmit={ submitLogin }>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="login-name-input"
              id="name"
              value={ nameValue }
              onChange={ enableButtonLogin }
            />
          </label>

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ btnDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  btnDisabled: PropType.bool.isRequired,
  nameValue: PropType.string.isRequired,
  enableButtonLogin: PropType.func.isRequired,
  submitLogin: PropType.func.isRequired,
};

export default Login;
