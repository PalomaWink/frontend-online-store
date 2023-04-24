import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetail extends Component {
  state = {
    productsCategory: {},
  };

  componentDidMount() {
    this.handleClickCategory();
  }

  handleClickCategory = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getProductById(id);
    this.setState({
      productsCategory: result,
    });
  };

  handleAddToCart = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('productsList'));
    product.qtd = 1;
    if (!carrinho) {
      const listProducts = JSON.stringify([product]);
      return localStorage.setItem('productsList', listProducts);
    }
    const listProducts = JSON.stringify([...carrinho, product]);
    return localStorage.setItem('productsList', listProducts);
  };

  render() {
    const { productsCategory } = this.state;
    return (
      <div>
        <div>
          <h1>Detalhes do Produto</h1>
          <h2 data-testid="product-detail-name">{productsCategory.title}</h2>
          <img
            data-testid="product-detail-image"
            src={ productsCategory.thumbnail }
            alt={ productsCategory.title }
          />
          <p data-testid="product-detail-price">{productsCategory.price}</p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleAddToCart(productsCategory) }
          >
            Adicionar ao Carrinho
          </button>
        </div>
        <Link
          to="/carrinho"
        >
          <button data-testid="shopping-cart-button">Carrinho</button>
        </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetail;
