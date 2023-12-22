import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  state = {
    recLocalStorage: [],
    fullName: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    addressType: '',
    validation: undefined,
  };

  componentDidMount() {
    this.RecItemsLocalStorage();
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: newValue,
    });
  }

  RecItemsLocalStorage = () => {
    const teste = JSON.parse(localStorage.getItem('productsList'));
    this.setState({
      recLocalStorage: teste,
    });
  };

  validationData = (event) => {
    const { history } = this.props;
    event.preventDefault();
    const {
      fullName,
      cep,
      cpf,
      email,
      telefone,
      endereco,
      addressType,
    } = this.state;
    if ((fullName.length === 0) || (cep.length === 0) || (cpf.length === 0)
      || (email.length === 0) || (telefone.length === 0)
      || (endereco.length === 0) || !(addressType)) {
      return this.setState({ validation: true });
    }
    this.setState({
      validation: false,
    });
    history.push('/');
    localStorage.clear();
  };

  render() {
    const {
      recLocalStorage,
      addressType,
      fullName,
      cep,
      cpf,
      email,
      telefone,
      endereco,
      validation,
    } = this.state;
    return (
      <div>
        <div>
          <h3>Revise seus produtos</h3>
          { recLocalStorage.map((items) => (
            <div key={ items.id }>
              <img src={ items.thumbnail } alt="Imagem do produto" />
              <p>{items.title}</p>
              <p>
                R$
                {items.price}
              </p>
            </div>
          ))}
        </div>
        <fieldset>
          <h3>Informações do comprador</h3>
          <label htmlFor="inputName">
            Nome completo
            <input
              name="fullName"
              id="inputName"
              type="text"
              value={ fullName }
              data-testid="checkout-fullname"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputEmail">
            Email
            <input
              name="email"
              type="email"
              id="inputEmail"
              data-testid="checkout-email"
              value={ email }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputCPF">
            CPF
            <input
              name="cpf"
              type="text"
              id="inputCPF"
              data-testid="checkout-cpf"
              value={ cpf }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputTelefone">
            Telefone
            <input
              name="telefone"
              type="text"
              id="inputTelefone"
              data-testid="checkout-phone"
              value={ telefone }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputCep">
            CEP
            <input
              name="cep"
              type="text"
              id="inputCep"
              data-testid="checkout-cep"
              value={ cep }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="addressInput">
            Endereço
            <input
              name="endereco"
              type="text"
              id="addressInput"
              data-testid="checkout-address"
              value={ endereco }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="inputBoleto">
            Boleto
            <input
              type="radio"
              id="inputBoleto"
              value="Boleto"
              checked={ addressType === 'Boleto' }
              data-testid="ticket-payment"
              name="addressType"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputPagamento">
            Visa
            <input
              type="radio"
              id="inputPagamento"
              value="Visa"
              checked={ addressType === 'Visa' }
              data-testid="ticket-payment"
              name="addressType"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputMasterCard">
            MasterCard
            <input
              type="radio"
              id="inputMasterCard"
              value="MasterCard"
              checked={ addressType === 'MasterCard' }
              data-testid="master-payment"
              name="addressType"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="inputElo">
            Elo
            <input
              type="radio"
              id="inputElo"
              data-testid="elo-payment"
              value="Elo"
              checked={ addressType === 'Elo' }
              name="addressType"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
        </fieldset>
        <button
          data-testid="checkout-btn"
          type="submit"
          onClick={ (e) => this.validationData(e) }
        >
          Comprar
        </button>
        <div data-testid="error-msg">
          { validation && <p>Campos inválidos</p>}
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Checkout;
