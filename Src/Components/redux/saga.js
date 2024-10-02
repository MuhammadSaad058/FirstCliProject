import {takeEvery,put} from 'redux-saga/effects';
import {USER_LIST,SET_USER_DATA} from './constants';
function* userList() {
    const url = "https://dummyjson.com/users";
    try {
      let response = yield fetch(url);
      let data = yield response.json();
      yield put({ type: SET_USER_DATA, data: data.users }); // Assuming the data has a users property
    } catch (error) {
      console.error("Failed to fetch user list", error);
    }
  }
  
  function* SagaData() {
    yield takeEvery(USER_LIST, userList);
  }
export default SagaData;