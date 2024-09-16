import { Dispatch } from 'redux';
import { userApi } from '../../api';
import { statusAction, fetchAction } from '.';
import { UserType } from '../../interfaces/domain';
import { NavigateFunction } from 'react-router';
class User {
  addUserAction = async (user: UserType, dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());

      const { data: { msg } } = await userApi.addUser(user);

      dispatch(statusAction.addSuccessStatus(msg));
    } catch (e: any) {
      dispatch(statusAction.addErrorStatus(e));
    } finally {
      dispatch(fetchAction.fetchingFailed());
    }
  };

  loginAction = (credentials: { email: string; password: string }, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());

      const { data: { userData} } = await userApi.login(credentials);
      const { token, user } = userData;
      if (userData ) {
        console.log('Token and role received:', token , user.role );
userData
        // Store token and role in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);

        // Verify storage
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        console.log('Stored Token:', storedToken);
        console.log('Stored Role:', storedRole);

        // Dispatch success action
        dispatch(statusAction.addSuccessStatus('Login successful'));

        // Navigate based on role
        if (storedRole === 'student') {
          console.log('Navigating to /view-students');
          navigate('/view-students');
        } 
        else if(storedRole === 'faculty admin'){
          console.log('Navigating to /view-students');
          navigate('/view-students');
        }
        else if(storedRole === 'professor'){
          console.log('Navigating to /view-students');
          navigate('/view-students');
        }        else if(storedRole === 'teaching assistant'){
          console.log('Navigating to /view-students');
          navigate('/view-students');
        }
        else {
          console.log('Role is not student, no navigation applied.');
        }
      } else {
        console.error('Token or role not received');
        
      const { data: { userData, role } } = await userApi.login(credentials);

      // Ensure token and role are received
      if (userData ) {
        console.log('Token and role received:', {userData , role });}
      }
    } catch (e: any) {
      dispatch(statusAction.addErrorStatus(e));
      console.error('Login failed:', e);
    } finally {
      dispatch(fetchAction.fetchingFailed());
    }
  };
}

export default new User();
