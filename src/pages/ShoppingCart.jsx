import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { BsTrash } from 'react-icons/bs';
import { TiArrowBack } from 'react-icons/ti';
import ShoppingBag from '../components/ShoppingBag';

import '../styles/ShoppingCart.css';

class ShoppingCart extends Component {
  state = {
    recLocalStorage: [],
  };

  componentDidMount() {
    this.getList();
  }

  increaseProduct = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('productsList'));
    if (carrinho.some((e) => e.id === product.id)) {
      const index = carrinho.findIndex((i) => i.id === product.id);
      carrinho[index].qtd += 1;
      const listProducts = JSON.stringify([...carrinho]);
      localStorage.setItem('productsList', listProducts);
      return this.getList();
    }
  };

  decreaseProduct = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('productsList'));
    if (carrinho.some((e) => e.id === product.id && product.qtd > 1)) {
      const index = carrinho.findIndex((i) => i.id === product.id);
      carrinho[index].qtd -= 1;
      const listProducts = JSON.stringify([...carrinho]);
      localStorage.setItem('productsList', listProducts);
      return this.getList();
    }
  };

  removeProduct = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('productsList'));
    const index = carrinho.findIndex((i) => i.id === product.id);
    carrinho.splice(index, 1);
    const listProducts = JSON.stringify([...carrinho]);
    localStorage.setItem('productsList', listProducts);
    return this.getList();
  };

  getList = () => {
    const teste = JSON.parse(localStorage.getItem('productsList'));
    this.setState({
      recLocalStorage: teste,
    });
  };

  render() {
    const { recLocalStorage } = this.state;
    return (
      <div className="container__main__shopping__cart">
        <div className="back__home">
          <Link to="/">
            <TiArrowBack color="green" size={ 35 } />
            Voltar
          </Link>
        </div>
        <div className="container__shopping__cart">
          <div className="title__shopping__cart">
            <h1>Carrinho de Compras</h1>
          </div>
          {recLocalStorage === null || recLocalStorage.length === 0
            ? (
              <div className="shopping__empty">
                <ShoppingBag />
                <p
                  data-testid="shopping-cart-empty-message"
                  className="empty__message"
                >
                  Seu carrinho está vazio
                </p>
                <Link
                  to="/"
                >
                  <button
                    className="finish__button"
                  >
                    Contiue comprando
                  </button>
                </Link>
              </div>
            )
            : (recLocalStorage.map((product) => (
              <div key={ product.id } className="shopping__products__list">
                <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  R$
                  {product.price}
                </p>
                <div className="shopping__products__quantity">
                  <button
                    className="increase-button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.increaseProduct(product) }
                  >
                    <CiCirclePlus size={ 28 } />
                  </button>
                  <p data-testid="shopping-cart-product-quantity">{product.qtd}</p>
                  <button
                    className="decrease-button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseProduct(product) }
                  >
                    <CiCircleMinus size={ 28 } />
                  </button>
                  <button
                    data-testid="remove-product"
                    className="remove-button"
                    onClick={ () => this.removeProduct(product) }
                  >
                    <BsTrash size={ 25 } />
                  </button>
                </div>
              </div>
            )))}
          {
            recLocalStorage >= 1 && (
              <Link
                to="/checkout"
              >
                <button
                  className="finish__button"
                  data-testid="checkout-products"
                >
                  Finalizar compra
                </button>
              </Link>
            )
          }
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
