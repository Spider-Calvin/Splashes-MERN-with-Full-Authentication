import {combineReducers}  from 'redux';

import posts from'./Post';
import auth from './Auth'

export default combineReducers({
   posts, auth
});
