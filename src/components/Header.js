import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    const user = await getUser();
    this.setState = ({
      loading: false,
      name: user.name,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <p data-testid="header-user-name">
            Bem vindo,
            { name }
          </p>
        )}
      </header>
    );
  }
}

export default Header;
