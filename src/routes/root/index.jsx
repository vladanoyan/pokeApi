import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../../reducer';
import NavBar from '../../components/ListingNavbar';
import Footer from '../../components/Footer';
import cs from './App.pcss';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


class Root extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <Provider store={store} className={cs.App}>
          {renderRoutes(this.props.route.routes)}
        </Provider>
        <Footer />
      </div>
    );
  }
}

Root.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
  }).isRequired,
};

export default Root;
