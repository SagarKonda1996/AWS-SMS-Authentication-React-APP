import React from 'react';
import classes from './Footer.module.css';
import { withRouter } from 'react-router-dom';

const Footer = ({ history }) => {
 

  return (
    <div id="footer" className={classes['app-footer']}>
      <div className={classes['footer-text']}>
        <span>© 2020 Developed By Sagar Konda.</span>
      </div>
    </div>
  );
};

export default withRouter(Footer);
