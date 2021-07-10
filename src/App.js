import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from "react-router-dom";
import AdminLayout from './AdminLayout/AdminLayout';
import AdminToolbar from './components/AdminToolbar';
import Footer from './components/Footer';
import Header from './components/header';
import './default.scss';
import { auth, handleUserProfile } from './firebase/ultils';
import WithAdminAuth from './hoc/withAdminAuth';
// hoc
import WithAuth from './hoc/WithAuth';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Order from './pages/Order';
import Payment from './pages/Payment';
import ProductDetails from './pages/ProductDetails';
import ForgotPsw from './pages/Recovery';
import Registration from './pages/Registration';
import Search from './pages/Search';
import { setCurrentUser } from './redux/User/user.actions';





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
        <Route  path="/cart" >
         <Cart />
          </Route>
        <Route  path="/product/:productID" >
         <ProductDetails />
          </Route>
        <Route  path="/search/:filterType" >
         <Search />
          </Route>
          <Route  path="/order/:orderID" >
          <WithAuth>
          <Order/>
          </WithAuth>
          </Route>
        <Route exact path="/search" >
         <Search />
          </Route>
        <Route path="/admin" >
          <WithAdminAuth>
          <AdminLayout>
          <Admin />
          </AdminLayout>
          </WithAdminAuth>
          </Route>
          <Route path="/payment">
            <WithAuth>
            <Payment/>
            </WithAuth>
          </Route>
        <Route  path="/dashboard" >
         <WithAuth>
         <Dashboard/>
         </WithAuth>
          </Route>
        <Route  path="/recovery" >
         <ForgotPsw />
          </Route>
          <Route  path="/registration" render={()=> currentUser ? <Redirect to="/"/>:(
            <Registration/>
          )}/>
          
         
          <Route  path="/login" render={()=>  currentUser? <Redirect to="/"/>:(
              <Login/>
          )}/>
            
         
          <Route  path="/users">
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
