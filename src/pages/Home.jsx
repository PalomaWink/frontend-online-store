import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import { PiShoppingCartThin } from 'react-icons/pi';
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

  formatPrice = (price) => {
    const [reais, centavos] = price.toFixed(2).split('.');
    return { reais, centavos };
  };

  formatOriginalPrice = (price) => {
    if (price === null) {
      return { originalReais: '', originalCentavos: '' };
    }
    const [originalReais, originalCentavos] = price.toFixed(2).split('.');
    return { originalReais, originalCentavos };
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
          <div className="navbar__shopping">
            <Link
              to="/carrinho"
              data-testid="shopping-cart-button"
            >
              <PiShoppingCartThin size={ 32 } color="blue" />
            </Link>
          </div>
        </div>

        <CategoryList />

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
            : (productsList.map((product) => {
              const { reais, centavos } = this.formatPrice(product.price);
              const { originalReais, originalCentavos } = this
                .formatOriginalPrice(product.original_price);
              console.log(originalCentavos);
              return (
                <div data-testid="product" key={ product.id } className="products__list">
                  <span className="products__list__span">
                    {product.attributes[0].value_name}
                  </span>
                  <h2>{product.title}</h2>
                  <img src={ product.thumbnail } alt={ product.title } />
                  {product.original_price !== null ? (
                    <span className="product__original__price">
                      R$
                      <span className="product__original__price__reais">
                        {originalReais}
                      </span>
                      <sup className="product__original__price__centavos">
                        {originalCentavos}
                      </sup>
                    </span>
                  ) : ''}
                  <span className="product__price">
                    R$
                    <span className="price__reais">{reais}</span>
                    <sup className="price__centavos">{centavos}</sup>
                  </span>
                  {product.shipping.tags.includes('fulfillment')
                && <span className="product__shipping">Frete Grátis</span>}
                  {product.shipping.tags.includes('mandatory_free_shipping') && (
                    <div className="product__shipping__full">
                      <span>Enviado pelo</span>
                      <svg viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><path d="M6.4 0h12.8l-6.4 11.429h10.667l-17.067 20.571 4.267-13.714h-10.667l6.4-18.286zM34.626 23.467h-4.77l4.077-18.498h13.562l-0.915 4.16h-8.791l-0.61 2.884h8.57l-0.915 4.16h-8.597l-1.609 7.294zM57.687 23.799c-5.685 0-8.486-2.718-8.486-6.601 0-0.305 0.083-0.943 0.139-1.22l2.441-11.010h4.853l-2.413 10.899c-0.028 0.139-0.083 0.444-0.083 0.777 0.028 1.525 1.193 2.995 3.55 2.995 2.551 0 3.855-1.609 4.326-3.772l2.413-10.899h4.826l-2.413 10.982c-0.998 4.493-3.439 7.849-9.152 7.849zM82.33 23.467h-12.203l4.077-18.498h4.77l-3.134 14.338h7.405l-0.915 4.16zM98.596 23.467h-12.203l4.077-18.498h4.77l-3.134 14.338h7.405l-0.915 4.16z" /></svg>
                    </div>)}
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ () => this.handleAddToCart(product) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              );
            }))}
        </div>
      </div>
    );
  }
}

export default Home;
