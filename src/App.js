import  { React,useState,useEffect } from 'react';
import './default.scss';
import Header from './components/header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import {auth, handleUserProfile} from './firebase/ultils';
import {setCurrentUser} from './redux/User/user.actions';
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
import Admin from './pages/Admin';
import WithAdminAuth from './hoc/withAdminAuth';
import AdminToolbar from './components/AdminToolbar';



const App = ()=>  {
  const  currentUser =  useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
        dispatch( setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        
        })
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);
  return (
    <Router>
    <div className="App"> 
    <AdminToolbar/>
       <Header  />
     <div className="main">
    
  
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/admin" >
          <WithAdminAuth>
          <Admin />
          </WithAdminAuth>
          </Route>
        <Route exact path="/dashboard" >
         <WithAuth>
         <Dashboard/>
         </WithAuth>
          </Route>
        <Route exact path="/recovery" >
         <ForgotPsw />
          </Route>
          <Route exact path="/registration" render={()=> currentUser ? <Redirect to="/"/>:(
            <Registration/>
          )}/>
          
         
          <Route exact path="/login" render={()=>  currentUser? <Redirect to="/"/>:(
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
