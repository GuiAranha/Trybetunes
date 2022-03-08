import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      username: '',
    };
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    const user = await getUser();
    this.setState({
      loading: false,
      username: user.name,
    });
  }

  render() {
    const { state } = this;
    return (
      <header data-testid="header-component">
        { state.loading
          ? <Loading />
          : (
            <div>
              <p data-testid="header-user-name">{state.username}</p>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </div>
          ) }
      </header>
    );
  }
}

export default Header;
