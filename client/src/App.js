import {Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Form from './components/Form/Form';
import LandingPage from './components/LandingPage/LandingPage';
import './App.css';


function App() {
  return (
    <div className="App">
      <Route exact path="/">
            <LandingPage/>
          </Route>
      <Route exact path='/home' ><Home/></Route>
      <Route exact path='/dogs/:id'><Details/></Route>
      <Route exact path='/dog/create'><Form/></Route>
      
      
    </div>
  );
}

export default App;
  