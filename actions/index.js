import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchInvoices = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
      type: 'FETCH_INVOICES',
      payload: response.data
    });
};