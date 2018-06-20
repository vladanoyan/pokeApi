export const data = (dataUrl) => dispatch => {
  setTimeout(() => {
    fetch(dataUrl)
      .then((resp) => resp.json())
      .then((dataFetch) => {
        dispatch({ type: 'DATA', dataFetch });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, 400);
};

