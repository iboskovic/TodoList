import React, { FC, ChangeEvent, useState } from 'react';
//import './Styles/App.scss';
import { Link } from 'react-router-dom';


const Nav: FC = () => {

    return (
        <div className="header">
            <div className="header__links">
                <Link to='/'>
                    <a className="header__links__navLinks"><i className="icon--home"></i>Home</a>
                </Link>
                <Link to='/addnew'>
                    <a className="header__links__navLinks"><i className="icon--add"></i>Add New</a>
                </Link>
                    <a className="header__links__navLinks"><i className="icon--edit"></i>Update</a>
            </div>
            
      </div>
    )
}

export default Nav;