import { Navigate } from 'react-router-dom';
import ModalExample from './modal';

const PrivateRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log("TOKEN",token)

  if (!token) {
   console.log("TOKEN",token)
   //  return <Navigate to="/login" />;
   return <ModalExample/>
  }

  if (!allowedRoles.includes(role)) {
     return <Navigate to="/unauthorized" />;
  }

    return children;
};
export default PrivateRoute;