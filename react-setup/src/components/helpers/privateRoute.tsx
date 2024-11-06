import { Navigate, useNavigate } from 'react-router-dom';
import ModalExample from './modal';

const PrivateRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') ?? '';
  console.log("TOKEN", token)
  const navigate = useNavigate()
  if (!token) {
    console.log("TOKEN", token)

    return <ModalExample title='Not Authenticated' content='Please login to continue' onConfirm={() => navigate('/login')}
      confirmBTNText='Login'
      onCancel={() => { navigate(-1) }} />

  }

  if (!allowedRoles.includes(role)) {
    return <ModalExample title='Un Authorized Access'
      content="You don't have permission to access this route"
      onConfirm={() => navigate('/login')}
      confirmBTNText='Login with other account'
      onCancel={() => { navigate(-1) }} />

  };


  return children;
};
export default PrivateRoute;