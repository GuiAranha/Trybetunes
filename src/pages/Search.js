import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      searchValue: '',
      nameArtist: '',
      searching: false,
      album: '',
    };
    this.enableButtonSearch = this.enableButtonSearch.bind(this);
    this.getAlbum = this.getAlbum.bind(this);
    this.validate = this.validate.bind(this);
  }

  async getAlbum() {
    const { searchValue } = this.state;
    this.setState({
      searching: true,
    });
    const albuns = await searchAlbumsAPI(searchValue);
    this.setState({
      album: albuns,
      nameArtist: searchValue,
      searchValue: '',
    }, this.validate);
  }

  validate() {
    const { album } = this.state;
    return album.length > 0
      ? this.setState({ searching: false })
      : this.setState({ searching: false, album: 'Nenhum álbum foi encontrado' });
  }

  enableButtonSearch(event) {
    this.setState({ searchValue: event.target.value });
    const min = 2;
    if (event.target.value.length >= min) {
      this.setState({ btnDisabled: false });
    }
  }

  render() {
    const { btnDisabled, nameArtist, searching, album, searchValue } = this.state;

    return (
      <div data-testid="page-search">
        <p>Search</p>
        <Header />
        {searching ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome do artista:
              <input
                type="text"
                data-testid="search-artist-input"
                id="name"
                value={ searchValue }
                onChange={ this.enableButtonSearch }
              />
            </label>

            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              onClick={ this.getAlbum }
            >
              Entrar
            </button>
          </form>
        ) }
        {Array.isArray(album)
          ? (
            <div>
              <p>{`Resultado de álbuns de: ${nameArtist}`}</p>
              {album.map((item) => (
                <Link
                  data-testid={ `link-to-album-${item.collectionId}` }
                  to={ `/album/${item.collectionId}` }
                  key={ item.collectionId }
                >
                  <div>
                    <img
                      src={ item.artworkurl100 }
                      alt={ `Album: ${item.collectionName}` }
                    />
                    <p>{ item.collectionName}</p>
                    <p>{ item.artistName}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : <p>{album}</p>}
      </div>
    );
  }
}

export default Search;
