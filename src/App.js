import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
// import NotFound from './components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import { createContext } from 'react';
import PrivetRouter from './Components/PrivetRouter/PrivetRouter';
import Profile from './Components/Dashboard/Profile/Profile';
import AddProduct from './Components/AddProduct/AddProduct';
import AddService from './Components/AddService/AddService';
import Contest from './Components/Contest/Contest';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log({ loggedInUser });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivetRouter path="/Dashboard/profile">
            <Profile></Profile>
          </PrivetRouter>
          <PrivetRouter path="/Dashboard/addProduct">
     <AddService></AddService>
          </PrivetRouter>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivetRouter path="/contest">
            <Contest></Contest>
          </PrivetRouter>
          <PrivetRouter path="/shipment">
            <Shipment></Shipment>
          </PrivetRouter>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
        <ProductDetails></ProductDetails>
          </Route>


          {/* <Route path="*">
            <NotFound></NotFound>
          </Route> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;