import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from './../redux/User/user.actions';


import VerticalNav from '../components/VerticalNAV';

const AdminLayout = props => {

  const dispatch = useDispatch();

  const signOutt = () => {
    dispatch(signOut());
  };

  return (
    <div className="adminLayout">
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">
                  Home
                </Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOutt()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;