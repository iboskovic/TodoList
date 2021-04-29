import React, { FC, ChangeEvent, useState } from 'react';
import './Styles/App.scss';
import AddNew from './AddNew';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import { Link } from 'react-router-dom';;


// Routes
const App = () => {
  return (
    <Router>
      <div>
        <Nav />
      </div>
      <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/addnew" component={AddNew} />
      </Switch>
    </Router>
  )
};

// Home page display
const Main: FC = () => {

  // create state for active div class
  const [active, setActive] = useState(false);

  const [checked, setChecked] = useState(false);

  return (
    <div className="App">
      <div className="subHeader">
        <div className="subHeader__hamburger" onClick={() => setActive(!active)}>
            <div className={`subHeader__hamburger__line ${active ? 'active' : ''}`}></div>
        </div>
        <div className="subHeader__inputContainer">
          <div className="created">Created Tasks</div>
        </div>
      </div>
      <div className="section-container">
          {/* <div className={active ? "sidebar" : "inactive"}> */}
          <div className={`sidebar ${active ? 'active' : ''}`}>
            <div className="sidebar__wrapper">
                <a className="sideLinks"><i className="icon--home"></i>Home</a>
                <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                <a className="sideLinks">Link 3</a>
                <a className="sideLinks">Link 4</a>
                <a className="sideLinks">Link 5</a>
                <a className="sideLinks">Link 6</a>
            </div>
          </div>
        <div className={ active ? "todoList" : "sidebar-inactive"}>
          <div className="task">
              <div className="task__line">
              </div>
              <button className="task__button task__button--success" onClick={() => setChecked(!checked)}><i className="icon--check"></i></button>
              <div className="content">
                  <span id="spanTask" className={checked ? "checked" : "in-progress"}>Task 1</span>
              </div>
              <button className="task__button task__button--remove"><i className="icon--remove"></i></button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default App;
