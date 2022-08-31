import React from 'react';
// import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import { Redirect, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userName = await getUser();
    this.setState({
      user: userName.name,
    });
    this.setState({ isLoading: false });
  }

  // searchButton = () => {
  // const history = useHistory();

  // handleClick = () => {
  // history.push('/search');
  // };
  // return (
  // <button type="button" onClick={ handleClick }>
  // Pesquisar
  // </button>
  // );
  // };

  // handleRedirect = () => {
  // const { history } = this.props;
  // history.push('./search');
  // };

  // search = () => {
  // const history = useHistory();
  // history.push('./search');
  // };

  render() {
    const { user, isLoading } = this.state;
    return (
      isLoading ? (
        <Loading />
      )
        : (
          <div>
            <header
              data-testid="header-component"
            >
              <Link to="/search" data-testid="link-to-search">
                Pesquisar
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                Músicas Favoritas
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </header>
            <h5 data-testid="header-user-name">{ user }</h5>
          </div>
        )
    );
  }
}

// Header.propTypes = {
// history: PropTypes.func.isRequired,
// };

export default Header;
