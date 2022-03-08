import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      nameArtist: '',
    };
    this.enableButtonSearch = this.enableButtonSearch.bind(this);
  }

  enableButtonSearch(event) {
    this.setState({ nameArtist: event.target.value });
    const min = 2;
    if (event.target.value.length >= min) {
      this.setState({ btnDisabled: false });
    }
  }

  render() {
    const { btnDisabled, nameArtist } = this.state;

    return (
      <div data-testid="page-search">
        <p>Search</p>
        <Header />
        <form>
          <label htmlFor="name">
            Nome do artista:
            <input
              type="text"
              data-testid="search-artist-input"
              id="name"
              value={ nameArtist }
              onChange={ this.enableButtonSearch }
            />
          </label>

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
