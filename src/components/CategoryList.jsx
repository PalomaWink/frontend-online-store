import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class CategoryList extends Component {
  state = {
    categories: [],
    productsCategory: [],
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleGetCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  handleClickCategory = async (event) => {
    const { id } = event.target;
    const result = await getProductsFromCategoryAndQuery(id);

    this.setState({
      productsCategory: result.results,
    });
  };

  /*  handleChange = ( }) => {
    this.setState({
      name: id,
    }, this.handleClickCategory());
  }; */

  render() {
    const { categories, productsCategory } = this.state;
    return (
      <div>
        <h1>Categorias</h1>
        <ul>
          {categories.map((i) => (
            <label key={ i.id } data-testid="category" htmlFor={ i.id }>
              <button
                name="category"
                type="radio"
                onClick={ this.handleClickCategory }
                id={ i.id }
              >
                {i.name}
              </button>
            </label>
          ))}
          {
            productsCategory.map((product) => (
              <div data-testid="product" key={ product.id }>
                <Link
                  to={ `/detalhes/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <p>{product.title}</p>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{product.price}</p>

                </Link>
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default CategoryList;
