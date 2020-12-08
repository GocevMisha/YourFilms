import React, {Component} from 'react';
import { WebView } from 'react-native-webview';

export class MovieScreen extends Component {
  render = () => {
    return (
          <WebView source={{ uri: "https://www.kinopoisk.ru/film/"+this.props.route.params.movie_id+"/" }} />
          );

  };
}
