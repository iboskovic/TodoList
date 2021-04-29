import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import AddNew from './AddNew';
import Main from './Main';

const MainRouter: React.FC = () => {

    return (
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/addnew" component={AddNew} />
            </Switch>
    );
};

export default MainRouter;
