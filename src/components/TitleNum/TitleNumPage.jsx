import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from './TitleNumPage.less';

export default class TitleNumPage extends Component {
  render() {
    const { title, num, style, linkUrl } = this.props;
    return (
      <div className={styles.root} style={style}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.num}>
          {
            linkUrl ?
              (
                <Link to={linkUrl}>
                  <span className={styles.numLink}>{num}</span>
                </Link>
              )
              : num
          }
        </p>
      </div>
    );
  }
}

TitleNumPage.propTypes = {
  linkUrl: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

TitleNumPage.defaultProps = {
  linkUrl: "",
  style: {},
  title: "标题",
  num: "-",
};