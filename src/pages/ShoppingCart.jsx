import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    recLocalStorage: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const teste = JSON.parse(localStorage.getItem('productsList'));
    console.log(teste);
    this.setState({
      recLocalStorage: teste,
    });
  };

  render() {
    const { recLocalStorage } = this.state;
    return (
      <div>
        {recLocalStorage === null
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
            </div>
          )))}
      </div>
    );
  }
}

export default ShoppingCart;
