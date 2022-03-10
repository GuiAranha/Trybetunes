import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selected: [],
    };
    this.addFavorite = this.addFavorite.bind(this);
  }

  async addFavorite(event) {
    this.setState({ loading: true });
    await addSong(event.target.value);
    this.setState((oldState) => ({
      loading: false,
      selected: [...oldState.selected, event.target.id],
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
                      value={ music }
                      id={ music.trackId }
                      onChange={ this.addFavorite }
                      checked={ selected.some((id) => +id === music.trackId) }
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
