import React, { Component } from 'react';

class ProductDetail extends Component {
  handleClickCategory = async (event) => {
    const { id } = event.target;
    console.log(id);
    const result = await getProductById(id);
    console.log(result);

    this.setState({
      productsCategory: result.results,
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
        </Link>
        
      </div>
    );
  }
}

export default ProductDetail;
