import React, { FC, ChangeEvent, useState } from 'react';
//import './Styles/App.scss';
import TodoTask from './Components/TodoTask';
import { Link } from 'react-router-dom';

const Nav: FC = () => {

    const [active, setActive] = useState(false);

    return (
        <div className="header">
            <div className="header__links">
                <Link to='/'>
                    <a className="header__links__navLinks"><i className="icon--home"></i>Home</a>
                </Link>
                <Link to='/addnew'>
                    <a className="header__links__navLinks"><i className="icon--add"></i>Add New</a>
                </Link>
            </div>
            
      </div>
    )
}

export default Nav;