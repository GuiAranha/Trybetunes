import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selected: [],
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.allFavorites = this.allFavorites.bind(this);
  }

  componentDidMount() {
    this.allFavorites();
  }

  async allFavorites() {
    const all = await getFavoriteSongs();
    this.setState({
      selected: all,
    });
  }

  async addFavorite(event) {
    const { musics } = this.props;
    const allMusics = musics.filter((item) => item.trackName)
      .find((item) => item.trackId === +event.target.value);
    this.setState({ loading: true });
    await addSong(allMusics);
    this.setState((oldState) => ({
      loading: false,
      selected: [...oldState.selected, allMusics],
    }));
  }

  render() {
    const { musics } = this.props;
    const { loading, selected } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            musics.filter((item) => item.trackName)
              .map((music) => (
                <div key={ music.trackId }>
                  <p>{music.trackName}</p>
                  <audio data-testid="audio-component" src={ music.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ music.trackId }>
                    Favorita
                    <input
                      type="checkbox"
                      data-testid={ `checkbox-music-${music.trackId}` }
                      value={ music.trackId }
                      id={ music.trackId }
                      onChange={ this.addFavorite }
                      checked={ selected.some((id) => +id.trackId === music.trackId) }
                    />
                  </label>
                </div>
              )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
