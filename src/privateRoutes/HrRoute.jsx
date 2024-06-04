
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/userHr';
import { Navigate } from 'react-router-dom';

const HrRoute = ({children}) => {
    const { user } = useAuth();
    const [role] = useAdmin();

  
    if (user && role === 'hr') {
      return children;
    }
    return <Navigate to={"/"} />;
}

export default HrRoute