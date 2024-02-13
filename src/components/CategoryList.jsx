import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/CategoryList.css';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class CategoryList extends Component {
  state = {
    categories: [],
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
    const { updateProductsFromCategory } = this.props;
    updateProductsFromCategory(result.results);
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="container__main">
        <div className="container__categorys">
          <h2>Categorias</h2>
          <ul className="category__list">
            {categories.map((i) => (
              <label key={ i.id } data-testid="category" htmlFor={ i.id }>
                <button
                  name="category"
                  type="radio"
                  onClick={ this.handleClickCategory }
                  id={ i.id }
                  className="category__button"
                >
                  {i.name}
                </button>
              </label>
            ))}
          </ul>
        </div>
      </div>

    );
  }
}

CategoryList.propTypes = {
  updateProductsFromCategory: PropTypes.func.isRequired,
};

export default CategoryList;
