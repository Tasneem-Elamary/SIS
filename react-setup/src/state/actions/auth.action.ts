import { Dispatch } from 'redux';
import { userApi } from '../../api'; 
import { statusAction, fetchAction } from '.';
import  User  from '../../interfaces/domain/user';

class Auth {
  loginAction = (credentials: User) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { token } } = await userApi.login(credentials);
      dispatch(statusAction.addSuccessStatus('Login successful'));
      // Store token in local storage or update the state with the token
      localStorage.setItem('token', token);
      dispatch(fetchAction.fetchingSucceeded());
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
    }
  };
}

export default new Auth();
