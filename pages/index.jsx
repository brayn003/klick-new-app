import { Component } from 'react';
import Router from 'next/router';

export default class Page extends Component {
  componentDidMount() {
    Router.push('/canvas/add-media');
  }

  render() {
    return <p>Redirecting ...</p>;
  }
}
