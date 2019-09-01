import React, { Component } from 'react';
import Footer from '../../components/footer/Footer';
import styles from './Content.css'

export default class Content extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Content</h1>
        <Footer></Footer>
      </div>
    );
  }
}
