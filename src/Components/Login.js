import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    isSaveButtonDisabled: true,
    user: '',
    isLoading: false,
  };

  handleClick = async () => {
    const { user } = this.state;
    const { history } = this.props;
    localStorage.setItem('name', user);
    this.setState({ isLoading: true });
    await createUser({ name: user });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  handleChange = ({ target }) => { // função genérica
    const NUMBER_LENGTH = 3;

    this.setState({
      [target.name]: target.value,
    }, () => {
      const { user } = this.state;
      const lengthUser = user.length;

      this.setState({ isSaveButtonDisabled: lengthUser < NUMBER_LENGTH }); // para que esse estado seja verdade ele precisa ser menor que 3, caso seja maior ou igual a três ele mudará o estado para false
    });
  };

  render() {
    const { isSaveButtonDisabled, user, isLoading } = this.state;

    return (
      isLoading ? (
        <Loading />
      )
        : (
          <div data-testid="page-login">
            <h1>Login</h1>
            <form>
              <div>
                <label htmlFor="name">
                  Nome
                  <input
                    name="user"
                    type="text"
                    id="user"
                    value={ user }
                    onChange={ this.handleChange }
                    data-testid="login-name-input"
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isSaveButtonDisabled }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        ));
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

// Login.propTypes = {
// userName: PropTypes.string.isRequired,
// isSaveButtonDisabled: PropTypes.func.isRequired,
// onSaveButtonCLick: PropTypes.func.isRequired,
// onInputChange: PropTypes.func.isRequired,
// };

export default Login;
