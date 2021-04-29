import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import AddNew from './AddNew';
import Main from './App';

const MainRouter = () => {

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
    );
};

export default MainRouter;
