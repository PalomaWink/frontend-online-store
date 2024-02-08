import React from 'react';
import './styles/App.css';
import './styles/Navbar.css';
import './styles/ProductsList.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/carrinho" component={ ShoppingCart } />
        <Route exact path="/detalhes/:id" component={ ProductDetail } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    </div>
  );
}

export default App;
