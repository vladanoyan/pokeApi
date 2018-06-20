const pokeApi = (state = [], action) => {
  switch (action.type) {
    case 'DATA':
      return Array.concat([], action.dataFetch.results);
    default:
      return state;
  }
};
export default pokeApi;
