import React, { Component } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentBody from '../contentBody/ContentBody';
import styles from './Content.css';
import globalStyles from '../../app.global.css';

export default class Content extends Component {
  render() {
    return (
      <div className={`${styles.container}`}>
        <Header></Header>
        <ContentBody></ContentBody>
        <Footer></Footer>
      </div>
    );
  }
}
