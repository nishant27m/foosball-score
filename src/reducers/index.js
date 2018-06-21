import { combineReducers } from 'redux';
import BooksReducers from './reducer_books';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
    books: BooksReducers,
    form: formReducer
});

export default rootReducer;
