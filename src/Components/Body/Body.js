import React from 'react';
import classes from './Body.module.css';
import RouterOutlet from '../../Routes';

const Body = () => {
  return (
    <div className={classes['app-body']} id="app-body">
      <RouterOutlet/>
    </div>
  );
};

export default Body;
