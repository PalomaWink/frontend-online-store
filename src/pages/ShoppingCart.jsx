import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <div>
        {recLocalStorage === null || recLocalStorage.length === 0
          ? (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          )
          : (recLocalStorage.map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p data-testid="shopping-cart-product-quantity">{product.qtd}</p>
              <p>{product.price}</p>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseProduct(product) }
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseProduct(product) }
              >
                -
              </button>
              <button
                data-testid="remove-product"
                onClick={ () => this.removeProduct(product) }
              >
                Remover produto
              </button>
            </div>
          )))}
        <Link
          to="/checkout"
        >
          <button data-testid="checkout-products">Finalizar compra</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
