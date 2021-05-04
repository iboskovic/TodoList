import './styles/App.scss';
import Nav from './components/Nav';
import MainRouter from './MainRouter';


// Routes
const App = () => {
  return (
    <div>
      <Nav />
      <MainRouter />
    </div>
  )
};

export default App;
