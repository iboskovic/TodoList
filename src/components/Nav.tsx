import { FC } from 'react';
import { Link } from 'react-router-dom';

const Nav: FC = () => {

    return (
        <div className="header">
            <div className="header__links">
                <Link className="header__links__navLinks" to='/'><i className="icon icon--home spc--bottom--sm spc--right--sm"></i>Home</Link>
                <Link className="header__links__navLinks" to='/add'><i className="icon icon--add spc--bottom--sm spc--right--sm"></i>Add New</Link>
            </div>
        </div>
    )
}

export default Nav;