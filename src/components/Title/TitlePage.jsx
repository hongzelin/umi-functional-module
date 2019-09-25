import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './TitlePage.less';

export default class TitlePage extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.title}>{title}</div>
    );
  }
}

TitlePage.propTypes = {
  title: PropTypes.string,
};

TitlePage.defaultProps = {
  title: "标题",
};