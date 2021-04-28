import  { React,useState,useEffect } from 'react';
import './default.scss';
import Header from './components/header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import {auth, handleUserProfile} from './firebase/ultils';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Footer from './components/Footer';
import Login from './pages/Login';



function App()  {
  const initialState =null
 const [user, setUser] = useState(initialState);
let authListener=null;
 useEffect(() => {
 authListener = auth.onAuthStateChanged( async (userAuth)=>{
    if(userAuth){
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot =>{
        setUser({
          id:snapshot.id,
          ...snapshot.data()
        });
      })
    }
    setUser(initialState);
  });

 }, [])
  return (
    <Router>
    <div className="App"> 
       <Header user={user}/>
     <div className="main">
    
  
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/registration">
          {user? <Redirect to="/" />:<Registration user={user}/>}
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/"/>:<Login/>}
          </Route>
          <Route exact path="/users">
            {/* <Users /> */}
          </Route>
          <Route exact path="/">
            <Homepage user={user}/>
          </Route>
        </Switch>
      
      
     </div>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
