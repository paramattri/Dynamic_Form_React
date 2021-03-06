import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RenderCard from './components/RenderCard';
import RenderQuote from './components/RenderQuote';
import MiniDrawer from './components/MiniDrawer';
import Partners from './components/Partners';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact render={(location) => <MiniDrawer RenderComponent={RenderCard} location={location}/>}></Route>
          <Route path="/quote" exact render={(location) => <MiniDrawer RenderComponent={RenderQuote} location={location}/>}></Route>
          <Route path="/partners" exact render={(location) => <MiniDrawer RenderComponent={Partners} location={location}/>}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
