import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import AddNew from './AddNew';
import Main from './Main';
import Update from './Update';

const MainRouter: React.FC = () => {

    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/addnew" component={AddNew} />
            <Route path="/edit/:id" component={Update} />
        </Switch>
    );
};

export default MainRouter;
