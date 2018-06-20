import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { data } from '../../actions/data';
import cs from './component.pcss';

class filterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: true,
      currentPage: 1,
      todosPerPage: 20,
      page: null,
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 800);
    this.props.dispatchData(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${this.state.page}`);
  }
  handleClick(event) {
    this.setState({
      page: event.target.id,
    });
    this.props.dispatchData(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${this.state.page}`);
  }
  newPage() {
    this.setState({ page: this.state.page += 20 });
    this.props.dispatchData(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${this.state.page}`);
  }

  prevPage() {
    this.setState({
      page: this.state.page === 0 || this.state.page === null ? 0 : this.state.page -= 20 });
    this.props.dispatchData(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${this.state.page}`);
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    const currentTodos = this.props.pokemon.slice(indexOfFirstTodo, indexOfLastTodo);

    const itemFilter = currentTodos.length > 1 ? currentTodos.filter(
      (item) => item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1,
      ) : currentTodos;

    const pokemonName = itemFilter.map((pokemon) => {
      const url = `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`;
      return (
        <div key={pokemon.name.toString()} className={cs.wrapper}>
          <img title={pokemon.name} src={url} alt={pokemon.name} />
          <div>
            <h4>{pokemon.name}</h4>
          </div>
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 20; i <= this.state.page; i += 20) {
      if (i % 2 === 0) {
        pageNumbers.push(i);
      }
    }
    return (
      <div>
        <Container>
          <Row>
            <Col xs="12" sm="12" md="12">
              <form>
                <div className={cs.form}>
                  <input
                    type="text"
                    className={cs.inputSearch}
                    placeholder="filter items"
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                  />
                </div>
              </form >
            </Col>
            <Col xs="12" sm="12" md="12">
              <div className={cs.content}>
                {pokemonName}
              </div>
            </Col>
          </Row>
          <div>
            <ul className={cs.pageNumbers}>
              {pageNumbers.map((number, i) => {
                const m = i + 1;
                return (
                  <li
                    role="presentation"
                    key={number}
                    id={number}
                    onClick={this.handleClick.bind(this)}
                  >
                    {m}
                  </li>
                );
              })
              }
            </ul>
            <div className={cs.prevNext}>
              <button onClick={this.prevPage.bind(this)}>Prev</button>
              <button onClick={this.newPage.bind(this)}>Next</button>
            </div>
          </div>
        </Container>
        <div className={cs.showbox} style={{ display: this.state.show ? 'block' : 'none' }}>
          <div className={cs.loader}>
            <svg className={cs.circular} viewBox="25 25 50 50">
              <circle className={cs.path} cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

filterList.propTypes = {
  dispatchData: PropTypes.func.isRequired,
  pokemon: PropTypes.arrayOf(PropTypes.shape({
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    pokemon: state.pokeApi,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchData: (dataUrl) => {
      dispatch(data(dataUrl));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(filterList);
