import React from 'react';
import { Redirect } from 'react-router-dom';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <p>Carregando...</p>
        <Redirect to="/search" />
      </div>
    );
  }
}

export default Loading;
