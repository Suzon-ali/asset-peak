
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/userHr';
import { Navigate } from 'react-router-dom';

const EmplayeeRoute = ({children}) => {
    const { user } = useAuth();
    const [role] = useAdmin();

  
    if (user && role === 'employee') {
      return children;
    }
    return <Navigate to={"/"} />;
}

export default EmplayeeRoute