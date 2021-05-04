import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddNew from './components/AddNew';
import Main from './components/Main';
import Update from './components/Update';

const MainRouter: React.FC = () => {

    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/add" exact component={AddNew} />
            <Route path="/edit/:id" component={Update} />
        </Switch>
    );
};

export default MainRouter;
