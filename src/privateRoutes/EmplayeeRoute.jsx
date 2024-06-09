
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate } from 'react-router-dom';
import RefreshLoader from '../utility/Loaders/RefreshLoader';

const EmplayeeRoute = ({children}) => {
    const { user , loading} = useAuth();
    const [role] = useAdmin();

    if (loading) {
      return <RefreshLoader />
    }
  
    if (user && role === 'employee') {
      return children;
    }
    return <Navigate to={"/"} />;
}

export default EmplayeeRoute