import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { getProductById } from '../services/api';
import '../styles/ProductDetails.css';

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
    const { match: { params: { id } } } = this.props;
    event.preventDefault();
    const { email, rate, textarea, recLocalStorage } = this.state;
    const states = {
      mail: email,
      ratings: rate,
      areaText: textarea,
    };
    if (email && rate) {
      localStorage.setItem(id, JSON.stringify([...recLocalStorage, states]));
      this.setState({
        validate: true,
        email: '',
        rate: '',
        textarea: '',
      });
      return this.carregaLocalStorage();
    }
    this.setState({
      validate: false,
    });
  };

  carregaLocalStorage = () => {
    const { match: { params: { id } } } = this.props;
    const comentarios = JSON.parse(localStorage.getItem(id));
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
    console.log(productsCategory.attributes);
    return (
      <div className="container__product__detail">
        <div className="product__details">
          <h1>Detalhes do Produto</h1>
          <h2 data-testid="product-detail-name">{productsCategory.title}</h2>
          <img
            data-testid="product-detail-image"
            src={ productsCategory.thumbnail }
            alt={ productsCategory.title }
          />
          <p data-testid="product-detail-price">
            R$
            {productsCategory.price}
          </p>
          <span>
            {productsCategory.value_name}
          </span>
          <button
            className="button__product__detail"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleAddToCart(productsCategory) }
          >
            Adicionar ao Carrinho
          </button>
        </div>
        <Link
          to="/carrinho"
        >
          <button
            data-testid="shopping-cart-button"
            className="button__product__detail"
          >
            Carrinho
          </button>
        </Link>
        <div />
        <form>
          <input
            data-testid="product-detail-email"
            className="input__email__product__detail"
            type="text"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChangeEmail }
            value={ email }
          />
          {ratings.map((index) => (
            <label key={ index } htmlFor={ `rate-${index}` }>
              <input
                type="radio"
                id={ `rate-${index}` }
                data-testid={ `${index}-rating` }
                value={ index }
                name="rate"
                onChange={ this.handleChangeRate }
                style={ { display: 'none' } } // Esconde o input radio
              />
              <span>
                {rate >= index ? (
                  <FaStar color="orange" />
                ) : (
                  <FaRegStar color="gray" />
                )}
              </span>
            </label>
          ))}
          <textarea
            className="textarea__product__detail"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChangeTextArea }
            value={ textarea }
          />
          <button
            className="button__product__detail"
            data-testid="submit-review-btn"
            onClick={ this.handleRequired }
          >
            Avaliar
          </button>
        </form>
        {validate === false
        && <p className="error-msg" data-testid="error-msg">Campos inválidos</p>}
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
