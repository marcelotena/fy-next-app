export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_INVOICES':
      return action.payload;
    default:
      return state;
  }
};