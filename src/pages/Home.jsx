import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import { PiShoppingCartThin } from 'react-icons/pi';
import { FiAlignJustify } from 'react-icons/fi';
import CategoryList from '../components/CategoryList';
import { getProductsFromCategoryAndQuery } from '../services/api';
import logo from '../images/logo_mercado_livre.png';
import ProductList from '../components/ProductList';

class Home extends Component {
  state = {
    nome: '',
    category: '',
    productsList: [],
    isLoading: false,
    searchAttempted: false,
    areCategoriesVisible: false,
  };

  toggleCategories = () => {
    this.setState((prevState) => ({
      areCategoriesVisible: !prevState.areCategoriesVisible,
    }));
  };

  handleClickBusca = async () => {
    const { nome, category } = this.state;
    this.setState({ isLoading: true, searchAttempted: true });
    const result = await getProductsFromCategoryAndQuery(category, nome);
    this.setState({
      productsList: result.results,
      isLoading: false,
    });
  };

  updateProductsFromCategory = (products) => {
    this.setState({
      productsList: products,
      isLoading: false,
      searchAttempted: true,
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      nome: value,
    });
  };

  render() {
    const { productsList, isLoading, searchAttempted, areCategoriesVisible } = this.state;
    let content;
    if (isLoading) {
      content = <p className="home__loading">Carregando...</p>;
    } else if (!isLoading && productsList.length === 0 && searchAttempted) {
      content = (
        <div>
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
      );
    } else {
      content = <ProductList products={ productsList } />;
    }
    return (
      <div>
        <div className="navbar">
          <button className="navbar__toggle" onClick={ this.toggleCategories }>
            <FiAlignJustify />
          </button>
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
              placeholder="Digite algum termo de pesquisa"
            />
            <button
              data-testid="query-button"
              onClick={ this.handleClickBusca }
            >
              <TfiSearch />
            </button>
          </div>
          <div className="navbar__shopping">
            <Link
              to="/carrinho"
              data-testid="shopping-cart-button"
            >
              <PiShoppingCartThin size={ 32 } color="blue" />
            </Link>
          </div>
        </div>
        <div className="home__products">
          <div className={ `categories ${areCategoriesVisible ? 'active' : ''}` }>
            <CategoryList
              updateProductsFromCategory={ this.updateProductsFromCategory }
            />
          </div>
          <div className="products-container">
            {content}
          </div>
        </div>
      </div>

    );
  }
}

export default Home;
