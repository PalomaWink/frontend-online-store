import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import CategoryList from '../components/CategoryList';
import { getProductsFromCategoryAndQuery } from '../services/api';
import logo from '../images/logo_mercado_livre.png';

class Home extends Component {
  state = {
    nome: '',
    category: '',
    productsList: [],
    isLoading: false,
  };

  handleClickBusca = async () => {
    const { nome, category } = this.state;
    const result = await getProductsFromCategoryAndQuery(category, nome);
    if (result.results.length === 0) {
      this.setState({
        isLoading: true,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    this.setState({
      productsList: result.results,
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      nome: value,
    });
  };

  // localStorage.setItem('keyItemName', value)
  handleAddToCart = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('productsList'));
    product.qtd = 1;
    if (!carrinho) {
      const listProducts = JSON.stringify([product]);
      return localStorage.setItem('productsList', listProducts);
    }
    if (carrinho.some((e) => e.id === product.id)) {
      const index = carrinho.findIndex((i) => i.id === product.id);
      carrinho[index].qtd += 1;
      const listProducts = JSON.stringify([...carrinho]);
      return localStorage.setItem('productsList', listProducts);
    }
    const listProducts = JSON.stringify([...carrinho, product]);
    return localStorage.setItem('productsList', listProducts);
  };

  render() {
    const { productsList, isLoading } = this.state;
    return (
      <div>
        <div className="navbar">
          <div className="navbar__logo">
            <img alt="logo do site" src={ logo } />
            <p>
              Front End
              <br />
              Online Store
            </p>
          </div>
          <div className="navbar__search">
            <input
              data-testid="query-input"
              type="text"
              onChange={ this.handleChange }
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
            />
            <button
              data-testid="query-button"
              onClick={ this.handleClickBusca }
            >
              <TfiSearch />
            </button>
          </div>
        </div>
        <CategoryList />
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          <button>carrinho</button>
        </Link>
        <div className="container__home">
          {isLoading
            ? (
              <div className="home__products">
                <p className="home__no__products">
                  Nenhum produto
                  <br />
                  foi encontrado
                </p>
                <p className="home__message">
                  Digite outro termo de pesquisa
                  <br />
                  ou escolha uma categoria
                </p>
              </div>
            )
            : (productsList.map((product) => (
              <div data-testid="product" key={ product.id } className="products__list">
                <h2>{product.attributes[0].value_name}</h2>
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  R$
                  {product.price}
                </p>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => this.handleAddToCart(product) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )))}
        </div>
      </div>
    );
  }
}

export default Home;
