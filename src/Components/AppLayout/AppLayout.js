import React, { useEffect } from 'react';
import AppHeader from '../Header';
import AppBody from '../Body';
import AppFooter from '../Footer';
import { BrowserRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';

import classes from './AppLayout.module.css';

const AppLayout =props => {
  useEffect(() => {
    setVh();
    window.addEventListener('resize', debounce(setVh, 200), false);

    return window.removeEventListener('resize', setVh, false);
  }, []);

  const setVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  return (
    <div className={classes['app-layout']}>
      <BrowserRouter>
        <AppHeader Logout={props.Logout} />
        <AppBody />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
};

export default AppLayout;
