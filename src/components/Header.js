import React from 'react';
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
          : <p data-testid="header-user-name">{state.username}</p> }
      </header>
    );
  }
}

export default Header;
