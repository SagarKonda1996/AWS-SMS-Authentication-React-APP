import React, { useState, useEffect } from 'react';
import classes from './Header.module.css';
import ClickOutSideContext from '../ClickOutSide/ClickOutSideContext';
import ClickOutSide from '../ClickOutSide';
import { withRouter } from 'react-router-dom';
import {Auth} from 'aws-amplify'


const HeaderActions = ({ history ,Logout}) => {
  const [showProfilePopUp, setShowProfilePopUp] = useState(false);
return(
  <div>
    <i className="fa fa-user" onClick={e=>setShowProfilePopUp(true)}/>
        {showProfilePopUp ? (
        <ClickOutSideContext.Provider
          value={{
            onClickOutSide: () => {
              setShowProfilePopUp(false);
            }
          }}
        >
          <ClickOutSide>
            <UserProfilePopUp  Logout={Logout}/>
          </ClickOutSide>
        </ClickOutSideContext.Provider>
      ) : null}

    </div>
  );
};



const UserProfilePopUp = ({Logout}) => {
  return (
    <div id="profile_popup" className={classes['user-profile-popup']}>
      <div className={classes['user-profile-popup-userDetails']}>
        <ul>
          <li>
            <button
              id="logout"
              className={classes['user-profile-popup-userDetails-email']}
              onClick={() =>Logout()}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}


const Header = props => {
  {console.log(props)}
  return (
    <div className={classes['app-header']}>
      <div>
        <button onClick={() => props.history.push( '/')}>
          CLICK HERE
        </button>
      </div>


      <HeaderActions history={props.history} Logout={props.Logout} />
    </div>
  );
}



export default withRouter(Header);
