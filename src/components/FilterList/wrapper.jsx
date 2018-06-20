import React from 'react';
import Filter from './index';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id),
        });
    }

    render() {
        const { currentPage } = this.state;

        return (
            <div>
                <Filter currentPage={currentPage} handleClick={this.handleClick} />
            </div>
        );
    }
}

export default Wrapper;


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
            todosPerPage: 6,
        };
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({ show: false });
        }, 1000);
        this.props.dispatchData(`https://pokeapi.co/api/v2/pokemon/?limit=3&offset=${(this.props.currentPage - 1) * 6}`);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPage !== this.props.currentPage) {
            this.props.dispatchData(`https://pokeapi.co/api/v2/pokemon/?limit=3&offset=${(nextProps.currentPage - 1) * 6}`);
        }
    }

    render() {
        const { todosPerPage } = this.state;
        const { currentPage } = this.props;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const pokemonName = this.props.pokemon.map((pokemon) => {
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
        for (let i = 1; i <= Math.ceil(30 / todosPerPage); i += 1) {
            pageNumbers.push(i);
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
                            {pageNumbers.map((number) => {
                                return (
                                    <li
                                        role="presentation"
                                        key={number}
                                        id={number}
                                        onClick={this.props.handleClick}
                                    >
                                        {number}
                                    </li>
                                );
                            })
                            }
                        </ul>
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
    currentPage: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
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
