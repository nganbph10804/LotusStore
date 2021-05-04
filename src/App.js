import  { React,useState,useEffect } from 'react';
import './default.scss';
import Header from './components/header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import {auth, handleUserProfile} from './firebase/ultils';
import {checkUserSession} from './redux/User/user.actions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from "react-router-dom";
// hoc
import WithAuth from './hoc/WithAuth';


import Footer from './components/Footer';
import Login from './pages/Login';
import ForgotPsw from './pages/Recovery';
import { connect, useDispatch, useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';



const App = ()=>  {
  // const  currentUser =  useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(checkUserSession());
 },[])
  
  return (
    <Router>
    <div className="App"> 
       <Header  />
     <div className="main">
    
  
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/dashboard" >
         <WithAuth>
         <Dashboard/>
         </WithAuth>
          </Route>
        <Route exact path="/recovery" >
         <ForgotPsw />
          </Route>
          <Route exact path="/registration" render={()=>(
            <Registration/>
          )}/>
          
         
          <Route exact path="/login" render={()=> (
              <Login/>
          )}/>
            
         
          <Route exact path="/users">
            {/* <Users /> */}
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      
      
     </div>
     <Footer/>
    </div>
    </Router>
  );
}



export default App
