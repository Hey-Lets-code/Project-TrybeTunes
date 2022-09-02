import React from 'react';
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
