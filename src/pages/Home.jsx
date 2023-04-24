import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import { getProductsFromCategoryAndQuery } from '../services/api';

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
    // Precisamos verificar se dentro do carrinho, já existe um product
    // acha o index do produto de dentro do carrinho (findIndex)
    // carrinho[index].qtd += 1
    // retornamos só o carrinho (precisa return)
    /*  if (carrinho.some((e) => e.Id === product.Id)) {
      const index = carrinho.findIndex((i) => i.Id === product.Id);
      carrinho[index].qtd += 1;
      return console.log(carrinho[index]);
    } */
    const listProducts = JSON.stringify([...carrinho, product]);
    return localStorage.setItem('productsList', listProducts);
  };

  render() {
    const { productsList, isLoading } = this.state;
    return (
      <div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input
          data-testid="query-input"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleClickBusca }
        >
          Buscar
        </button>
        <CategoryList />
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          <button>carrinho</button>
        </Link>
        {isLoading
          ? (<p>Nenhum produto foi encontrado</p>)
          : (productsList.map((product) => (
            <div data-testid="product" key={ product.id }>
              <p>{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.price}</p>
              <button
                data-testid="product-add-to-cart"
                onClick={ () => this.handleAddToCart(product) }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )))}
      </div>
    );
  }
}

export default Home;
