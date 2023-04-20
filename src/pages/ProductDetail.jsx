import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    console.log(result);
    this.setState({
      productsCategory: result,
    });
  };

  render() {
    const { productsCategory } = this.state;
    return (
      <div>
        <h1>Detalhes do Produto</h1>
        <h2 data-testid="product-detail-name">{productsCategory.title}</h2>
        <img
          data-testid="product-detail-image"
          src={ productsCategory.thumbnail }
          alt={ productsCategory.title }
        />
        <p data-testid="product-detail-price">{productsCategory.price}</p>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          <button data-testid="shopping-cart-button">Carrinho</button>
        </Link>
      </div>
    );
  }
}

export default ProductDetail;
