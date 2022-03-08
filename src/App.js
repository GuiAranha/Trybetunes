import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      Loading: false,
      nameValue: '',
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
    this.setState({ loading: true });
    const { nameValue } = this.state;
    event.preventDefault();
    await createUser({ name: nameValue });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          { loading ? <Loading /> : (
            <Switch>
              <Route
                exact
                path="/"
                render={ () => (
                  <Login
                    { ...this.state }
                    enableButtonLogin={ this.enableButtonLogin }
                    submitLogin={ this.submitLogin }
                  />
                ) }
              />
              <Route exact path="/search" component={ Search } />
              <Route exact path="/favorites" component={ Favorites } />
              <Route exact path="/profile" component={ Profile } />
              <Route exact path="/Profile/edit" component={ ProfileEdit } />
              <Route exact path="/album/:id" component={ Album } />
              <Route component={ NotFound } />
            </Switch>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
