import React from 'react';
import './default.scss';
import Header from './components/header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Footer from './components/Footer';
function App() {
  return (
    <Router>
    <div className="App"> 
       <Header/>
     <div className="main">
    
  
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/registration">
            <Registration/>
          </Route>
          <Route exact path="/users">
            {/* <Users /> */}
          </Route>
          <Route exact path="/">
            <Homepage/>
          </Route>
        </Switch>
      
      
     </div>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
