import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetail extends Component {
  state = {
    productsCategory: {},
    validate: undefined,
    recLocalStorage: [],
  };

  componentDidMount() {
    this.handleClickCategory();
    this.carregaLocalStorage();
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

  handleChangeEmail = ({ target }) => {
    const { value } = target;
    this.setState({
      email: value,
    });
  };

  handleChangeRate = ({ target }) => {
    const { value } = target;
    this.setState({
      rate: value,
    });
  };

  handleChangeTextArea = ({ target }) => {
    const { value } = target;
    this.setState({
      textarea: value,
    });
  };

  handleRequired = (event) => {
    event.preventDefault();
    const { email, rate, textarea } = this.state;
    const states = {
      mail: email,
      ratings: rate,
      areaText: textarea,
    };
    if (email && rate && textarea) {
      this.setState({
        validate: true,
      });
      localStorage.setItem('avaliações', JSON.stringify([states]));
      return this.carregaLocalStorage();
    }
    this.setState({
      validate: false,
    });
  };

  carregaLocalStorage = () => {
    const comentarios = JSON.parse(localStorage.getItem('avaliações'));
    if (comentarios !== null) {
      this.setState({
        recLocalStorage: [...comentarios],
      });
    }
  };

  render() {
    const { productsCategory,
      email, rate, textarea, validate, recLocalStorage } = this.state;
    const um = 1;
    const dois = 2;
    const tres = 3;
    const quatro = 4;
    const cinco = 5;
    const ratings = [um, dois, tres, quatro, cinco];

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
        <div />
        <form>
          <input
            data-testid="product-detail-email"
            type="email"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChangeEmail }
            value={ email }
          />
          <label htmlFor="rate" value={ rate }>
            {ratings.map((index) => (
              <div
                key={ index }
              >
                <input
                  type="radio"
                  data-testid={ `${index}-rating` }
                  value={ index }
                  name="rate"
                  onChange={ this.handleChangeRate }
                />
                {index}
              </div>
            ))}
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            onChange={ this.handleChangeTextArea }
            value={ textarea }
          />
          <button
            data-testid="submit-review-btn"
            onClick={ this.handleRequired }
          >
            Avaliar
          </button>
        </form>
        {validate === false && <p data-testid="error-msg">Campos inválidos</p>}
        {(recLocalStorage !== null && recLocalStorage.length !== 0)
          && (recLocalStorage.map((rates, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{rates.mail}</p>
              <p data-testid="review-card-rating">{rates.ratings}</p>
              <p data-testid="review-card-evaluation">{rates.areaText}</p>
            </div>
          )))}
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
