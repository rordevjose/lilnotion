import { RECEIVE_PAGE_ERRORS } from '../actions/page-actions';

const pageErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PAGE_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default pageErrorsReducer;
