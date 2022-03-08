import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      loading: false,
      nameValue: '',
      nameSaved: false,
    };
    this.enableButtonLogin = this.enableButtonLogin.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  enableButtonLogin(event) {
    this.setState({ nameValue: event.target.value });
    const min = 3;
    if (event.target.value.length >= min) {
      this.setState({ btnDisabled: false });
    }
  }

  async submitLogin(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { nameValue } = this.state;
    await createUser({ name: nameValue });
    this.setState({
      loading: false,
      nameSaved: true,
    });
  }

  render() {
    const { btnDisabled, nameValue, loading, nameSaved } = this.state;

    return (
      <div data-testid="page-login">
        <p>Login</p>
        {nameSaved && <Redirect to="/search" />}
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                data-testid="login-name-input"
                id="name"
                value={ nameValue }
                onChange={ this.enableButtonLogin }
              />
            </label>

            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ btnDisabled }
              onClick={ this.submitLogin }
            >
              Entrar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default Login;
